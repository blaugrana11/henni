import Model from './Model.js';

export default class Task extends Model {

  static table = "henni.tv";
  static primary = ["idtv"];
}
