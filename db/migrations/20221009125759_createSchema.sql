-- migrate:up
CREATE TABLE `notice` (
	`noticeId`	varchar(36)	NOT NULL,
	`companyId`	varchar(36)	NOT NULL,
	`position`	varchar(100)	NOT NULL,
	`reward`	decimal	NOT NULL,
	`content`	text	NOT NULL,
	`skill`	varchar(100)	NOT NULL,
	`created`	datetime	NOT NULL	DEFAULT  CURRENT_TIMESTAMP,
	`updated`	datetime DEFAULT NULL on UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `company` (
	`companyId`	varchar(36)	NOT NULL,
	`companyName`	varchar(500)	NOT NULL,
	`country`	varchar(100)	NOT NULL,
	`region`	varchar(100)	NOT NULL
);

CREATE TABLE `user` (
	`userId`	varchar(36)	NOT NULL
);

CREATE TABLE `apply` (
	`applyId`	varchar(36)	NOT NULL,
	`userId`	varchar(36)	NOT NULL,
	`noticeId`	varchar(36)	NOT NULL,
	`created`	datetime	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE `notice` ADD CONSTRAINT `PK_NOTICE` PRIMARY KEY (
	`noticeId`,
	`companyId`
);

ALTER TABLE `company` ADD CONSTRAINT `PK_COMPANY` PRIMARY KEY (
	`companyId`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`userId`
);

ALTER TABLE `apply` ADD CONSTRAINT `PK_APPLY` PRIMARY KEY (
	`applyId`,
	`userId`,
	`noticeId`
);

ALTER TABLE `notice` ADD CONSTRAINT `FK_company_TO_notice_1` FOREIGN KEY (
	`companyId`
)
REFERENCES `company` (
	`companyId`
);

ALTER TABLE `apply` ADD CONSTRAINT `FK_user_TO_apply_1` FOREIGN KEY (
	`userId`
)
REFERENCES `user` (
	`userId`
);

ALTER TABLE `apply` ADD CONSTRAINT `FK_notice_TO_apply_1` FOREIGN KEY (
	`noticeId`
)
REFERENCES `notice` (
	`noticeId`
);

-- migrate:down

