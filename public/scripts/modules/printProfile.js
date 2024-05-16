
export default  function printProfile(){
     fetch("/api/sessions/online")
    .then((res) => res.json())
    .then((userData) => {
        const user = userData.response;
        console.log(user)
    })
}