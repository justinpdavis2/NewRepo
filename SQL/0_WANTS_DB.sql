drop event if exists cleaning;
drop table if exists user_counties;
drop table if exists user_state;
drop table if exists users;
drop table if exists files;
drop table if exists transport_location;
drop table if exists transport;
drop table if exists destination_facility;
drop table if exists prisoner;
drop table if exists counties;
drop table if exists states;

SET GLOBAL event_scheduler = ON;

CREATE TABLE states(
    state_id INT NOT NULL AUTO_INCREMENT,
    state_name VARCHAR(255),
    state_initials VARCHAR(255),
    PRIMARY KEY(state_id)
);

CREATE TABLE counties(
    county_id INT NOT NULL AUTO_INCREMENT,
    county_name VARCHAR(255),
    state_id INT NOT NULL,
    PRIMARY KEY(county_id),
    CONSTRAINT county_state_id
    FOREIGN KEY (state_id) REFERENCES states (state_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE prisoner(
    prisoner_id INT NOT NULL AUTO_INCREMENT,
    f_name VARCHAR(255),
    m_initial VARCHAR(10),
    l_name VARCHAR(255),
    DOB DATE,
    sex ENUM('M','F','X'),
    race ENUM('W','B','H','I','A','P'),
    other VARCHAR(255),
    height INT,
    lbs INT,
    hair_color VARCHAR(255),
    eye_color VARCHAR(255),
    warrent_num_1 VARCHAR(255),
    warrent_num_2 VARCHAR(255),
    warrent_num_3 VARCHAR(255),
    charge_1 VARCHAR(255),
    charge_2 VARCHAR(255),
    charge_3 VARCHAR(255),
    misdemeanor BOOLEAN,
    felony BOOLEAN,
    caution BOOLEAN,
    optn BOOLEAN,
    medical_files JSON,
    creationDate DATE,
    PRIMARY KEY(prisoner_id)
);

CREATE TABLE destination_facility(
    facility_id INT NOT NULL AUTO_INCREMENT,
    facility_name VARCHAR(255),
    state_id INT NOT NULL,
    PRIMARY KEY(facility_id),
    CONSTRAINT `facility_state_id`
    FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE transport(
    transport_id INT NOT NULL AUTO_INCREMENT,
    prisoner_id INT NOT NULL,
    leaving VARCHAR(255),
    activity_log MEDIUMBLOB,
    destination VARCHAR(255),
    facility VARCHAR(255),
    notes TEXT,
    isActive BOOLEAN DEFAULT true,
    creationDate DATE,
    leavingDate DATE,
    relayDate DATE,
    arrivalDate DATE,
    PRIMARY KEY(transport_id),
    FOREIGN KEY(prisoner_id) REFERENCES  prisoner(prisoner_id)
);

CREATE TABLE transport_location(
    transport_id INT NOT NULL,
    loc_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(transport_id) REFERENCES transport(transport_id)
);

CREATE TABLE files(
    deletedFiles JSON
);

DELIMITER $$
	CREATE EVENT cleaning ON SCHEDULE EVERY 1 DAY ENABLE DO 
	BEGIN
		INSERT INTO files (deletedFiles)
			SELECT medical_files 
				FROM prisoner 
					WHERE prisoner.creationDate < CURRENT_TIMESTAMP - INTERVAL 30 DAY;
		DELETE FROM transport WHERE creationDate < CURRENT_TIMESTAMP - INTERVAL 30 DAY;
		DELETE FROM prisoner WHERE creationDate < CURRENT_TIMESTAMP - INTERVAL 30 DAY;
	END$$;
DELIMITER ;
