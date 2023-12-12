const table = document.querySelector('#mainTable');
const count = document.querySelector('#count');



const getAllData = () => {

    fetch('http://localhost:3000/all')
        .then(res => {

            return res.json()
        })
        .then(data => {

            fetch('http://localhost:3000/favorites')
                .then(res => res.json())
                .then(favs => {


                    data.forEach(dt => {


                        if (favs.find(f => f.id === dt.id)) {
                            table.innerHTML += `
                        <tr>
         <td>${dt.first_name}</td>
         <td>${dt.last_name}</td>
            <td>${dt.email}</td>
            <td><button onclick='rmvToFav(${dt.id})' >Remove from favs</button></td>
          </tr>
                        `
                        } else {
                            table.innerHTML += `
                        <tr>
             <td>${dt.first_name}</td>
            <td>${dt.last_name}</td>
            <td>${dt.email}</td>
            <td><button onclick='addToFav(${dt.id})'>Add to Favorite</button></td>
           </tr>
                        `
                        }
                    });
                    count.textContent = "( " + favs.length + " )"
                })



        })
        .catch(err => console.log(err))

}


const addToFav = (id) => {

    fetch('http://localhost:3000/all/' + id)
        .then(res =>
            res.json())
        .then(data => {

            return fetch('http://localhost:3000/favorites', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

        })
        .then(res => {
            if (res.status == 500) {
                throw new Error('Mehsul elave olunub')
            }
            return res.json()
        })
        .then(data => console.log(data))
        .catch(err => alert(err.message))
}

const rmvToFav = (id) => {

    fetch('http://localhost:3000/favorites/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => res.json()).then(data => console.log(data))

}


getAllData();