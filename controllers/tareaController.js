const Tarea = require("../models/tarea");

const createTarea = async (req, res) => {
  const { nombre } = req.body;
  const id = req.userID;

  const newTarea = new Tarea({ nombre, creator: id });

  await newTarea.save();

  res.status(200).json({
    ok: true,
    message: "tarea created successfully",
    newTarea,
  });
};

const readTarea = async (req, res) => {
  const id = req.userID;

  try {
    const tareas = await Tarea.find({ creator: id }).sort({ createAt: -1 });
    res.status(200).json({
      ok: true,
      tareas,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tarea no Encontrada",
    });
  }
};

const updateTarea = async (req, res) => {
  const { idUser } = req.params;
  const { nombre } = req.body; //nombre de la tarea que esta en mi modelo

  try {
    const tarea = await Tarea.findByIdAndUpdate(
      idUser,
      { nombre },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      msg: "Tarea Actualizada",
      tarea,
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tarea no Actualizada",
    });
  }
};
const deleteTarea = async (req, res) => {
  const { idUser } = req.params;

  try { 
    await Tarea.findByIdAndRemove(idUser);
    res.status(200).json({
      ok: true,
      msg: "Tarea Eliminada",
    });
  } catch (error) {
    return res.status(404).json({
      ok: false,
      msg: "Tarea no Eliminada",
    });
  }
};
module.exports = { createTarea, readTarea, updateTarea, deleteTarea };
