import { topn } from "./cfrating.js";
import { barang } from "./databarang.js";
//id,user,rating
const owner = "d";
var ratings = [
  ["Nike Air Force 1", "a", 4.5],
  ["Nike Air Force 1", "b", 4],
  ["Nike Air Force 1", "d", 2],
  ["Nike Air Force 1", "e", 2],

  ["Nike Air Max", "a", 3],
  ["Nike Air Max", "c", 4],
  ["Nike Air Max", "d", 2],
  ["Nike Air Max", "e", 1],

  ["Jordan 1 Retro High", "a", 2],
  ["Jordan 1 Retro High", "c", 1],
  ["Jordan 1 Retro High", "d", 3],
  ["Jordan 1 Retro High", "e", 4],
  ["Jordan 1 Retro High", "f", 4],

  ["Jordan 1 Mid Navy", "a", 2],
  ["Jordan 1 Mid Navy", "b", 2],
  ["Jordan 1 Mid Navy", "d", 4],
  ["Jordan 1 Mid Navy", "f", 4]
];

var top = topn(ratings, barang, owner);
console.log(top);
