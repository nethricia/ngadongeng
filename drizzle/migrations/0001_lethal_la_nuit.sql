ALTER TABLE `stories` ADD `media` text;--> statement-breakpoint
UPDATE `stories`
SET `media` = CASE `format`
	WHEN 'komik' THEN json_array(json_object(
		'kind', 'komik',
		'source', CASE `embed_provider`
			WHEN 'canva' THEN 'canva'
			WHEN 'gdrive' THEN 'gdrive'
			ELSE 'other'
		END,
		'url', `embed_url`
	))
	WHEN 'audio' THEN json_array(json_object(
		'kind', 'audio',
		'source', CASE `embed_provider`
			WHEN 'soundcloud' THEN 'soundcloud'
			WHEN 'spotify' THEN 'spotify'
			WHEN 'gdrive' THEN 'gdrive'
			ELSE 'direct'
		END,
		'url', `embed_url`
	))
	WHEN 'audiovisual' THEN json_array(json_object(
		'kind', 'audiovisual',
		'source', CASE `embed_provider`
			WHEN 'youtube' THEN 'youtube'
			WHEN 'gdrive' THEN 'gdrive'
			ELSE 'other'
		END,
		'url', `embed_url`
	))
	ELSE NULL
END
WHERE `embed_url` IS NOT NULL AND `media` IS NULL;
