const { default: axios } = require("axios")

const sumulateExam = () => {
    let result = null
    axios.post('http://localhost:3000/simulate/ask/', { lesson: 'fasdf', 'examType': 'Choose', 'noquestion': 1 })
        .then((response) => {
            result = JSON.parse(response.data.result)
        }).catch((error) => setResponse_Simulation(error.message))
        .finally(() => {

        })

    return result
}
console.log(sumulateExam())