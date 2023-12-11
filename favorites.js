const table = document.querySelector('#favTable');





const getFav = () => {

    fetch('http://localhost:3000/favorites/')
        .then(res => res.json())
        .then(data => {
            data.forEach(dt => {
                table.innerHTML += `
            <tr>
            <td>${dt.first_name}</td>
            <td>${dt.last_name}</td>
            <td>${dt.email}</td>
          </tr>
            `
            });

        })

}

getFav();