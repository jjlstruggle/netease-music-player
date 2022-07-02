export default function isVoidObj(obj: any) {
  return JSON.stringify(obj) === "{}";
}
