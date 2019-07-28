USE xinc;

INSERT INTO part VALUES('ISO-aaa','Screw','15');
INSERT INTO part VALUES('ISO-bbb','Bolt','5');
INSERT INTO part VALUES('ISO-ccc','Wood','50');

/* -- */

INSERT INTO warehouse VALUES('Storage A','Halifax');
INSERT INTO warehouse VALUES('Storage B','Toronto');

/* -- */

INSERT INTO inventory VALUES('ISO-aaa','Storage A','500');
INSERT INTO inventory VALUES('ISO-bbb','Storage A','500');
INSERT INTO inventory VALUES('ISO-ccc','Storage A','400');
INSERT INTO inventory VALUES('ISO-aaa','Storage B','300');
INSERT INTO inventory VALUES('ISO-bbb','Storage B','300');

/* -- */

INSERT INTO stock_level VALUES('Storage A','ISO-aaa','300');
INSERT INTO stock_level VALUES('Storage A','ISO-bbb','300');
INSERT INTO stock_level VALUES('Storage A','ISO-ccc','300');
INSERT INTO stock_level VALUES('Storage B','ISO-aaa','100');
INSERT INTO stock_level VALUES('Storage B','ISO-bbb','100');

/* -- */

USE yinc;

INSERT INTO part VALUES('ISO-aaa','Screw','15');
INSERT INTO part VALUES('ISO-bbb','Bolt','5');

/* -- */

INSERT INTO warehouse VALUES('Storage 1','Vancouver');
INSERT INTO warehouse VALUES('Storage 2','Saint John');

/* -- */

INSERT INTO inventory VALUES('ISO-aaa','Storage 1','300');
INSERT INTO inventory VALUES('ISO-bbb','Storage 1','300');
INSERT INTO inventory VALUES('ISO-aaa','Storage 2','300');
INSERT INTO inventory VALUES('ISO-bbb','Storage 2','300');

/* -- */

INSERT INTO stock_level VALUES('Storage 1','ISO-aaa','300');
INSERT INTO stock_level VALUES('Storage 1','ISO-bbb','300');
INSERT INTO stock_level VALUES('Storage 2','ISO-aaa','100');
INSERT INTO stock_level VALUES('Storage 2','ISO-bbb','100');

/* -- */

USE zinc;

INSERT INTO part VALUES('ISO-yyy','Chair','300');
INSERT INTO part VALUES('ISO-zzz','Desk','1000');

/* -- */

INSERT INTO warehouse VALUES('Storage I','Halifax');

/* -- */

INSERT INTO inventory VALUES('ISO-yyy','Storage I','100');
INSERT INTO inventory VALUES('ISO-zzz','Storage I','25');

/* -- */

INSERT INTO stock_level VALUES('Storage I','ISO-yyy','20');
INSERT INTO stock_level VALUES('Storage I','ISO-zzz','5');

/* For testing triggers */
/*
USE sharkinc;
SELECT * FROM xinc.inventory;
SELECT * FROM sharkinc.order_history;
SELECT * FROM sharkinc.log_sharkinc;
SELECT * FROM xinc.log_xinc;
INSERT INTO order_history VALUES('001','xinc','Storage A','ISO-aaa','100');
SELECT * FROM xinc.inventory;
SELECT * FROM sharkinc.order_history;
SELECT * FROM sharkinc.log_sharkinc;
SELECT * FROM xinc.log_xinc;
UPDATE order_history SET ord_quantity = '150' WHERE ord_id = '001';
SELECT * FROM xinc.inventory;
SELECT * FROM sharkinc.order_history;
SELECT * FROM sharkinc.log_sharkinc;
DELETE FROM order_history WHERE ord_id = '001';
SELECT * FROM xinc.inventory;
SELECT * FROM sharkinc.order_history;
SELECT * FROM sharkinc.log_sharkinc;
SELECT * FROM xinc.log_xinc;
*/
