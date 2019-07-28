USE sharkinc;

DELIMITER $$

/* Finds the largest quantity of a part  */
CREATE PROCEDURE findLargest (IN p_id VARCHAR(7), OUT largest INT)
BEGIN
    SELECT MAX(inv_quantity)
    INTO largest
	FROM
	(SELECT * FROM xinc.inventory
	UNION ALL
	SELECT * FROM yinc.inventory
	UNION ALL
	SELECT * FROM zinc.inventory)
	AS i
	WHERE par_id = p_id;
END; $$

/* Finds the name of warehouse with the largest quantity of a part  */
CREATE PROCEDURE findWarehouse (IN p_id VARCHAR(7), OUT w_name VARCHAR(16))
BEGIN
	DECLARE m INT;
	CALL findLargest(p_id, m);
    SELECT war_name
    FROM
    (SELECT * FROM xinc.inventory
	UNION ALL
	SELECT * FROM yinc.inventory
	UNION ALL
	SELECT * FROM zinc.inventory)
    AS i
	WHERE par_id = p_id AND inv_quantity = m;
END; $$

CREATE TRIGGER onInsertOnOrderHistory
BEFORE INSERT ON order_history
FOR EACH ROW
BEGIN
	INSERT INTO sharkinc.log_sharkinc VALUES (NULL, "INSERT", NEW.ord_id, NEW.ord_company_name, NEW.ord_warehouse_name, NEW.ord_part_id, NEW.ord_quantity);
    IF NEW.ord_company_name = 'xinc' THEN
		UPDATE xinc.inventory SET inv_quantity = inv_quantity - NEW.ord_quantity WHERE par_id = NEW.ord_part_id AND war_name = NEW.ord_warehouse_name;
	ELSEIF NEW.ord_company_name = 'yinc' THEN
		UPDATE yinc.inventory SET inv_quantity = inv_quantity - NEW.ord_quantity WHERE par_id = NEW.ord_part_id AND war_name = NEW.ord_warehouse_name;
    ELSEIF NEW.ord_company_name = 'zinc' THEN
		UPDATE zinc.inventory SET inv_quantity = inv_quantity - NEW.ord_quantity WHERE par_id = NEW.ord_part_id AND war_name = NEW.ord_warehouse_name;
	END IF;
END; $$

CREATE TRIGGER onDeleteOnOrderHistory
BEFORE DELETE ON order_history
FOR EACH ROW
BEGIN
	INSERT INTO sharkinc.log_sharkinc VALUES (NULL, "DELETE", OLD.ord_id, OLD.ord_company_name, OLD.ord_warehouse_name, OLD.ord_part_id, OLD.ord_quantity);
	IF OLD.ord_company_name = 'xinc' THEN
		UPDATE xinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
	ELSEIF OLD.ord_company_name = 'yinc' THEN
		UPDATE yinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
    ELSEIF OLD.ord_company_name = 'zinc' THEN
		UPDATE zinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
	END IF;
END; $$

CREATE TRIGGER onUpdateOnOrderHistory
BEFORE UPDATE ON order_history
FOR EACH ROW
BEGIN
	INSERT INTO sharkinc.log_sharkinc VALUES (NULL, "UPDATE", NEW.ord_id, NEW.ord_company_name, NEW.ord_warehouse_name, NEW.ord_part_id, NEW.ord_quantity);
	IF OLD.ord_company_name = 'xinc' THEN
		UPDATE xinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity - NEW.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
	ELSEIF OLD.ord_company_name = 'yinc' THEN
		UPDATE yinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity - NEW.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
    ELSEIF OLD.ord_company_name = 'zinc' THEN
		UPDATE zinc.inventory SET inv_quantity = inv_quantity + OLD.ord_quantity - NEW.ord_quantity WHERE par_id = OLD.ord_part_id AND war_name = OLD.ord_warehouse_name;
	END IF;
END; $$

DELIMITER ;

/* -- */

USE xinc;

DELIMITER $$

CREATE TRIGGER onUpdateOnInventory
BEFORE UPDATE ON inventory
FOR EACH ROW
BEGIN
	INSERT INTO log_xinc VALUES (NULL, "UPDATE", NEW.par_id, NEW.war_name, NEW.inv_quantity);
END; $$

DELIMITER ;

/* -- */

USE yinc;

DELIMITER $$

CREATE TRIGGER onUpdateOnInventory
BEFORE UPDATE ON inventory
FOR EACH ROW
BEGIN
	INSERT INTO log_yinc VALUES (NULL, "UPDATE", NEW.par_id, NEW.war_name, NEW.inv_quantity);
END; $$

DELIMITER ;

/* -- */

USE zinc;

DELIMITER $$

CREATE TRIGGER onUpdateOnInventory
BEFORE UPDATE ON inventory
FOR EACH ROW
BEGIN
	INSERT INTO log_zinc VALUES (NULL, "UPDATE", NEW.par_id, NEW.war_name, NEW.inv_quantity);
END; $$

DELIMITER ;