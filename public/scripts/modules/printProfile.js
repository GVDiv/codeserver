
export default async function printProfile(){
    let response = await fetch("/api/sessions/online");
    response = await response.json();
    let data = response;
        console.log(data);
        document.querySelector("#profile-details").innerHTML = `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <img src="${data.response.photo}" class="img-profile" alt="...">
            <p class="info-text">user: ${data.response.email}</p>
            <p class="info-text">role: ${data.response.role}</p>
        </div>
        </div>
        `
}