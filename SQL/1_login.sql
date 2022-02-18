CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `level` INT DEFAULT 1 NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
);

-- Used if permission level = 3 (Agency Coordinator)
CREATE TABLE `user_counties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `county_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_county_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `county_id`
    FOREIGN KEY (`county_id`)
    REFERENCES `counties` (`county_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Used if permission level = 4 (State Coordinator)
  CREATE TABLE `user_state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `state_id` INT NOT NULL,
  PRIMARY KEY (`id`),
    CONSTRAINT `user_state_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_state_id`
    FOREIGN KEY (`state_id`)
    REFERENCES `states` (`state_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



INSERT INTO `users` 
(`username`, `password`, `firstname`, `lastname`, `level`) 
VALUES 
("nick.schlecht", "test", "Nick", "Schlecht", 5),
("colton.berry", "test", "Colton", "Berry", 5),
("george.schmid", "test", "George", "Schmid", 5),
("mcguire.croes", "test", "McGuire", "Croes", 5),
("quinn.croes", "test", "Quinn", "Croes", 5);

-- Used for testing user level permissions
INSERT INTO `users` 
(`username`, `password`, `firstname`, `lastname`, `level`) 
VALUES 
("zero", "test", "john", "doe", 0),
("one", "test", "john", "doe", 1),
("two", "test", "john", "doe", 2),
("three", "test", "john", "doe", 3),
("four", "test", "john", "doe", 4),
("five", "test", "john", "doe", 5);

