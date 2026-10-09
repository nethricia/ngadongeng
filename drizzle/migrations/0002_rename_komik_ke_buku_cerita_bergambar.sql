UPDATE `stories` SET `format` = 'buku-cerita-bergambar' WHERE `format` = 'komik';--> statement-breakpoint
UPDATE `stories`
SET `media` = REPLACE(`media`, '"kind":"komik"', '"kind":"buku-cerita-bergambar"')
WHERE `media` LIKE '%"kind":"komik"%';
