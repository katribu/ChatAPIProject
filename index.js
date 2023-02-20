
const postsContainer = document.getElementById('posts')
const nameInput = document.getElementById('nameInput')
const textInput = document.getElementById('textInput')
const postBtn = document.getElementById('postBtn')

async function getPosts(){
    try{
        const response = await fetch('https://react-workshop-chat.herokuapp.com/chat')
        if(!response.ok){
            throw new Error(response.status)
        }
        else{
            const result = await response.json()
            const newMap = new Map();
            result.forEach((item) => newMap.set(item.name, item));
            const singleArray = [...newMap.values()];
            
            singleArray.map(post => {
                postsContainer.innerHTML += `
                <div class = 'postDiv'>
                <h4> ${post.name || 'N/A'} </h4>
                <p> ${post.text || 'N/A'} </p>
                </div>
                `
            })

        }

    } catch(error){
        console.error(error)
    }

}
getPosts()

postBtn.addEventListener('click', addPost)

async function addPost(){
    let newPost = {
        name: nameInput.value,
        text: textInput.value
    }
   await fetch('https://react-workshop-chat.herokuapp.com/chat', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
    })

    getPosts()
}


