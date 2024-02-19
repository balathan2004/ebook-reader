export default async function SendData(data, route) {
  console.log(data);
  try {
    var response = await fetch(`/api/${route}`, {
      body: data,
      method: "POST",
      contentType: "application/json",
    });
    var jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (e) {
    console.log(e);
    return e;
  }
}
