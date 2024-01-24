import express from "express";

const router = express.Router();

import authUserController from "../middlewares/authUserController.js";

import {
  cantEditController,
  exerciseExistsController,
  likeExistController,
} from "../middlewares/index.js";

import {
  newExercisesController,
  modifExercisescontroller,
  deleteExercisescontroller,
  listExercisesController,
  getExercisesController,
  likeEntryController,
} from "../controllers/exercises/index.js";

///////////////////////////////////////////////////////////////
//                   RUTAS DE EJERCICIOS                     //
///////////////////////////////////////////////////////////////

// Para AÑADIR  un nuevo ejercicio
router.post(
  "/newExercises",
  authUserController,
  cantEditController,
  newExercisesController,
);

// Para MODIFICAR un Ejercicio
router.put(
  "/modifExercise/:exerciseId",
  authUserController,
  cantEditController,
  exerciseExistsController,
  modifExercisescontroller,
);

// Para ELIMINAR un Ejercicio
router.delete(
  "/deleteExercise/:exerciseId",
  authUserController,
  cantEditController,
  exerciseExistsController,
  deleteExercisescontroller,
);

// Para visualizar todos los ejercicios
router.get("/exercises", authUserController, listExercisesController);

// Para visualizar un ejercicio en particular
router.get(
  "/exercise/:exerciseId",
  authUserController,
  exerciseExistsController,
  getExercisesController,
);

// Para darle LIKE a un ejercicio
router.post(
  "/exercises/like/:entryId/",
  authUserController,
  likeEntryController,
);

// Para listar los LIKE de un usuario

router.get("/listlikes", authUserController, likeExistController);

export default router;