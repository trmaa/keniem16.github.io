fetch("../maps/01.txt")
    .then(function (res) {
        return res.text();
    })
    .then(function (data) {
        console.log(data);
    });