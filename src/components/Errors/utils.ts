export function onItemSelected(item: string) {
  console.log(item);
}

export function onItemSelectedWithTime(item: string) {
  console.log(item + " " + Date.now());
}
