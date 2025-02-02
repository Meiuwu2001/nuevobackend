import connect from "../config/db.js";


export const getTarea = async (req, res) => {
  try {
    const db = await connect();
    const [result] = await db.query("SELECT * FROM tareas;");
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const createTarea = async (req, res) => {
  try {
    const db = await connect();
    await db.query("INSERT INTO tareas SET ?", [req.body]);
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
};

export const getTareaById = async (req, res) => {
  try {
    const db = await connect();
    const [result] = await db.query("SELECT * FROM Tarea WHERE idTareas =?", [
      req.params.id,
    ]);
    if (!result.length) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const updateTarea = async (req, res) => {
  try {
    const db = await connect();
    await db.query("UPDATE Tarea SET? WHERE idTareas =?", [
      req.body,
      req.params.id,
    ]);
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating data" });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    const db = await connect();
    await db.query("DELETE FROM tareas WHERE idTareas =?", [req.params.id]);
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting data" });
  }
};

