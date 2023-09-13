export default async function SendData(data, route) {
  var response = await fetch(`/api/${route}`, {
    body: data,
    method: "POST",
    contentType: "application/json",
  });
  var jsonData = await response.json();
  return jsonData;
}
