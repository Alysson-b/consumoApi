
async function fetchDataParallel(){
    const apiUrl = ('https://jsonplaceholder.typicode.com/posts/1')

    const resultContainer = document.getElementById('results')
    const loardingIndicador = document.getElementById('loarding')
    const fetchButton = document.getElementById('fetchButton')

    try{
        loardingIndicador.style.display = 'block';
        fetchButton.disabled = true;

        resultContainer.innerHTML = "";

    const request = [
        fetch(`${apiUrl}/1`),
        fetch(`${apiUrl}/2`),
        fetch(`${apiUrl}/3`)
    ]
    const responses = await Promise.all(request)

    const jsonData = await Promise.all(responses.map(response => response.json()))

    jsonData.forEach((data, index) => {
        const card = document.createElement('div')
        card.className = 'card';
        card.innerHTML = `
            <h2>resultado da requisiçao ${index + 1}</h2>
            <p><stronge>Titulo:</stronge>${data.title}</p>
            <p><stronge>Corpo:</stronge>${data.body}</p>

        `
        resultContainer.appendChild(card);

        gsap.fromto(card,
            {opacity: 0, y:20},
            {opacity: 1, y:0, duration: 0.5, delay: index * 0.2}
        )
    })

    }catch(error){
        console.error('ocorreu um erro:', error.message)
        resultContainer.innerHTML = `<p>Erro ao buscar dados: ${error.message}</p>`
    }
    finally{
        loardingIndicador.style.display = 'none'
        fetchButton.disabled = false
    }
}
document.getElementById('fetchButton').addEventListener('click', fetchDataParallel)