CREATE DATABASE xinc;
USE xinc;

CREATE TABLE part (
par_id VARCHAR(7) NOT NULL UNIQUE,
par_name VARCHAR(16) NOT NULL,
par_weight INT NOT NULL,
PRIMARY KEY (par_id)
);

/* -- */

CREATE TABLE warehouse (
war_name VARCHAR(16) NOT NULL UNIQUE,
war_location VARCHAR(16) NOT NULL,
PRIMARY KEY (war_name)
);

/* -- */

CREATE TABLE inventory (
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (par_id, war_name),
FOREIGN KEY (par_id) REFERENCES xinc.part (par_id),
FOREIGN KEY (war_name) REFERENCES xinc.warehouse (war_name)
);

/* -- */

CREATE TABLE stock_level (
war_name VARCHAR(16) NOT NULL,
par_id VARCHAR(7) NOT NULL,
sto_minimum INT NOT NULL,
PRIMARY KEY (war_name, par_id),
FOREIGN KEY (war_name) REFERENCES xinc.warehouse (war_name),
FOREIGN KEY (par_id) REFERENCES xinc.part (par_id)
);

/* -- */

CREATE TABLE log_xinc (
log_id INT NOT NULL UNIQUE AUTO_INCREMENT,
log_statement VARCHAR(10) NOT NULL,
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (log_id)
);

/* -- */

CREATE DATABASE yinc;
USE yinc;

CREATE TABLE part (
par_id VARCHAR(7) NOT NULL UNIQUE,
par_name VARCHAR(16) NOT NULL,
par_weight INT NOT NULL,
PRIMARY KEY (par_id)
);

/* -- */

CREATE TABLE warehouse (
war_name VARCHAR(16) NOT NULL UNIQUE,
war_location VARCHAR(16) NOT NULL,
PRIMARY KEY (war_name)
);

/* -- */

CREATE TABLE inventory (
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (par_id, war_name),
FOREIGN KEY (par_id) REFERENCES yinc.part (par_id),
FOREIGN KEY (war_name) REFERENCES yinc.warehouse (war_name)
);

/* -- */

CREATE TABLE stock_level (
war_name VARCHAR(16) NOT NULL,
par_id VARCHAR(7) NOT NULL,
sto_minimum INT NOT NULL,
PRIMARY KEY (war_name, par_id),
FOREIGN KEY (war_name) REFERENCES yinc.warehouse (war_name),
FOREIGN KEY (par_id) REFERENCES yinc.part (par_id)
);

/* -- */

CREATE TABLE log_yinc (
log_id INT NOT NULL UNIQUE AUTO_INCREMENT,
log_statement VARCHAR(10) NOT NULL,
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (log_id)
);

/* -- */

CREATE DATABASE zinc;
USE zinc;

CREATE TABLE part (
par_id VARCHAR(7) NOT NULL UNIQUE,
par_name VARCHAR(16) NOT NULL,
par_weight INT NOT NULL,
PRIMARY KEY (par_id)
);

/* -- */

CREATE TABLE warehouse (
war_name VARCHAR(16) NOT NULL UNIQUE,
war_location VARCHAR(16) NOT NULL,
PRIMARY KEY (war_name)
);

/* -- */

CREATE TABLE inventory (
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (par_id, war_name),
FOREIGN KEY (par_id) REFERENCES zinc.part (par_id),
FOREIGN KEY (war_name) REFERENCES zinc.warehouse (war_name)
);

/* -- */

CREATE TABLE stock_level (
war_name VARCHAR(16) NOT NULL,
par_id VARCHAR(7) NOT NULL,
sto_minimum INT NOT NULL,
PRIMARY KEY (war_name, par_id),
FOREIGN KEY (war_name) REFERENCES zinc.warehouse (war_name),
FOREIGN KEY (par_id) REFERENCES zinc.part (par_id)
);

/* -- */

CREATE TABLE log_zinc (
log_id INT NOT NULL UNIQUE AUTO_INCREMENT,
log_statement VARCHAR(10) NOT NULL,
par_id VARCHAR(7) NOT NULL,
war_name VARCHAR(16) NOT NULL,
inv_quantity INT NOT NULL,
PRIMARY KEY (log_id)
);

/* -- */

CREATE DATABASE sharkinc;
USE sharkinc;

CREATE TABLE order_history (
ord_id INT NOT NULL UNIQUE,
ord_company_name VARCHAR(16) NOT NULL,
ord_warehouse_name VARCHAR(16) NOT NULL,
ord_part_id VARCHAR(7) NOT NULL,
ord_quantity INT NOT NULL,
PRIMARY KEY (ord_id)
);

/* -- */

CREATE TABLE log_sharkinc (
log_id INT NOT NULL UNIQUE AUTO_INCREMENT,
log_statement VARCHAR(10) NOT NULL,
ord_id INT NOT NULL,
ord_company_name VARCHAR(16) NOT NULL,
ord_warehouse_name VARCHAR(16) NOT NULL,
ord_part_id VARCHAR(7) NOT NULL,
ord_quantity INT NOT NULL,
PRIMARY KEY (log_id)
);