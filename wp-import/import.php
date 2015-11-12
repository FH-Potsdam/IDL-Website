<?php

	require_once('lib/mysql.php');

	$target_dir = "./";
	$target_file = $target_dir.'data.csv';

	require_once('lib/parsecsv.lib.php');

	$csv = new parseCSV();
	$csv->encoding('macintosh', 'UTF-8');
	$csv->delimiter = ",";
	$csv->parse($target_file);

	//Create the initial wp_post entry
	$query = "INSERT INTO `wp_posts` (`post_type`,`post_status`,`comment_status`,`ping_status`,`post_name`,`post_title`, `post_date`, `post_date_gmt`) VALUES ('publication', 'publish', 'closed', 'closed', ?, ?, NOW(), NOW())";
	$post_stmt = $mysqli->prepare($query);
	$post_stmt->bind_param("ss", $name, $title);

	//After receiving the post_id we need to add the guid
	$query = "UPDATE `wp_posts` SET `guid` = ? WHERE id = ?";
	$guid_stmt = $mysqli->prepare($query);
	$guid_stmt->bind_param("si", $guid, $post_id);

	//Add a taxonomy year
	$query = "INSERT INTO `wp_term_relationships` (`object_id`,`term_taxonomy_id`)VALUES(?,?)";
	$year_stmt = $mysqli->prepare($query);
	$year_stmt->bind_param("ii", $post_id, $year_id);

	//Additional Meta like authors...
	$query = "INSERT INTO `wp_postmeta` (`post_id`,`meta_key`,`meta_value`)VALUES(?,?,?)";
	$meta_stmt = $mysqli->prepare($query);
	$meta_stmt->bind_param("iss", $post_id, $meta_key, $meta_value);

	foreach ($csv->data as $id => $item) {

		echo $item["title"].' ('.$item["year"].') '.$item["authors"].' '.$item["conference"]."\n";

		//Insert Post
		$name = toAscii($item["title"], "'");
		$title = '<!--:de-->'.str_replace("'", "\'", $item["title"]).'<!--:--><!--:en-->'.str_replace("'", "\'", $item["title"]).'<!--:-->';
		$post_stmt->execute();

		$post_id = $mysqli->insert_id;

		//Update guid
		$guid = "http://dev.jorditost.com/idl/?post_type=publication&#038;p=".$post_id;
		$guid_stmt->execute();

		//Years are stored as taxonomy ids
		/*
			1996 -> 7
			1997 -> 8
			...
			2016 -> 27
		*/
		//Frank probably has older stuff we need to update this...
		$year_id = intval($item["year"])-1989;
		$year_stmt->execute();


		//Adding Authors
		//Modify Delimiter to fit the file structure
		$authors = explode(";", $item["authors"]);
		$i = 0;
		foreach ($authors as $author) {
			$meta_key = "publications_authors_".$i."_name";
			$meta_value = $author;
			$meta_stmt->execute();

			$meta_key = "_publications_authors_".$i."_name";
			$meta_value = "field_558849ea6a7ad";
			$meta_stmt->execute();

			$author_ids = array(
				"Müller" => 38,
				"Heidmann" => 33,
				"Nagel" => 34,
				"Tost" => 113,
				"Meier" => 112,
				"Stange" => 162,
				"Thom" => 132
			);

			$exists = false;

			foreach ($author_ids as $author_name => $author_id) {
				if(strrpos($author, $author_name) !== false){
					//If Author exists, add url
					$meta_key = "publications_authors_".$i."_url";
					$meta_value = $author_id;
					$meta_stmt->execute();

					$meta_key = "_publications_authors_".$i."_url";
					$meta_value = "field_55884a316a7ae";
					$meta_stmt->execute();

					$exists = true;
				}
			}

			if(!$exists){
				$meta_key = "publications_authors_".$i."_url";
				$meta_value = "null";
				$meta_stmt->execute();

				$meta_key = "_publications_authors_".$i."_url";
				$meta_value = "field_55884a316a7ae";
				$meta_stmt->execute();
			}

			$i++;
		}

		//Number of Authors
		$meta_key = "publication_authors";
		$meta_value = $i;
		$meta_stmt->execute();

		$meta_key = "_publication_authors";
		$meta_value = "field_558f039feeb0e";
		$meta_stmt->execute();

		//Conference
		$meta_key = "publication_conference";
		$meta_value = $item["conference"];
		$meta_stmt->execute();

		$meta_key = "_publication_conference";
		$meta_value = "field_558f0bf713b8a";
		$meta_stmt->execute();

		//Publication File (default empty)
		$meta_key = "publication_file";
		$meta_value = "";
		$meta_stmt->execute();

		$meta_key = "_publication_file";
		$meta_value = "field_558f0c8c13b8c";
		$meta_stmt->execute();

	}

	$meta_stmt->close();
	$year_stmt->close();
	$guid_stmt->close();
	$post_stmt->close();
	$mysqli->close();

	//http://cubiq.org/the-perfect-php-clean-url-generator
	setlocale(LC_ALL, 'en_US.UTF8');
	function toAscii($str, $replace=array(), $delimiter='-') {
		if( !empty($replace) ) {
			$str = str_replace((array)$replace, ' ', $str);
		}

		$clean = iconv('UTF-8', 'ASCII//TRANSLIT', $str);
		$clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
		$clean = strtolower(trim($clean, '-'));
		$clean = preg_replace("/[\/_|+ -]+/", $delimiter, $clean);

		return $clean;
	}

	echo "\n".'DONE';

?>
