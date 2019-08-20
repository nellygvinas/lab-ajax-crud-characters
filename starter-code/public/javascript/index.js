const charactersAPI = new APIHandler("http://localhost:8000")

$(document).ready( () => {
  
  document.getElementById('fetch-all').onclick = function(e){
    // prevents page from refreshing
    e.preventDefault();

    let charactersDiv = $('.characters-container');

    charactersDiv.html('')

    axios.get('https://ih-crud-api.herokuapp.com/characters')
      .then((result)=>{

          //we make an axios request to the url + the searchterm
          console.log(result)
        let theCharacters = result.data;

          theCharacters.forEach(eachCharacter => {
          
            let theName = eachCharacter.name;
            let occupation = eachCharacter.occupation;
            let weapon = eachCharacter.weapon;
            let id = eachCharacter.id;

            //console.log(theName,occupation,weapon,id + "<br>")
            
            //charactersDiv.append(`<h2> Name: ${theName} </h2>`);

            charactersDiv.append(`<div class="character-info">
            <div class="name">Character Name: ${theName}</div>
            <div class="occupation">Character Occupation: ${occupation}</div>
            <div class="cartoon">Is a Cartoon? Unknown </div>
            <div class="weapon">Character Weapon: ${weapon} </div>
            <div class="id">Character ID: ${id} </div>`)
          }) //end of for each
          
          //charactersDiv.html('')


        })
        .catch((err)=>{
            console.log(err);
        })

  } // end of get all 
  
  document.getElementById('fetch-one').onclick = function(e){
      // prevents page from refreshing
      e.preventDefault();

      // Grab the div we are trying to make our changes to - in this case, the character-containers div
      let charactersDiv = $('.characters-container');

      // Clear the div before the get request, just in case there is data in the div from a prior request
      charactersDiv.html('')

      // Grab the id value from the input, by using the id assigned to the input on the index.html
      let idValue =  $('#character-id').val()
      console.log(idValue)

      axios.get('https://ih-crud-api.herokuapp.com/characters/'+ idValue)
        .then((result)=>{

          console.log(result.data)
          
          let eachCharacter = result.data
          
          let theName = eachCharacter.name;
          let occupation = eachCharacter.occupation;
          let weapon = eachCharacter.weapon;
          let id = eachCharacter.id;

          charactersDiv.append(`<div class="character-info">
          <div class="name">Character Name: ${theName}</div>
          <div class="occupation">Character Occupation: ${occupation}</div>
          <div class="cartoon">Is a Cartoon? Unknown </div>
          <div class="weapon">Character Weapon: ${weapon} </div>
          <div class="id">Character ID: ${id} </div>`)
        }) 
        .catch((err)=>{

        // Add error message stating character not found
          charactersDiv.append(`<div class="character-info">
          <div class="name">Character ID (${idValue}) Not Found in Database</div>`)
            console.log(err);
        }) // end of get request

        // Clear the input after the search is completed.
        charactersDiv.html('')

  }
  
  document.getElementById('delete-one').onclick = function(e){

    // prevents page from refreshing
    e.preventDefault();

    // Grab the div we are trying to make our changes to - in this case, the character-containers div
    let charactersDiv = $('.characters-container');

    // Clear the div before the get request, just in case there is data in the div from a prior request
    charactersDiv.html('')

    // Grab the id value from the input, by using the id assigned to the input on the index.html
    let idValue =  $('#character-id-delete').val()
    console.log(idValue)

    axios.delete('https://ih-crud-api.herokuapp.com/characters/'+ idValue)
        .then((result)=>{

          console.log(result.data)
          
          charactersDiv.append(`<div class="character-info">
          <h2>Character Successfully Deleted</h2>
          `)
        }) 
        .catch((err)=>{

        // Add error message stating character not found
          charactersDiv.append(`<div class="character-info">
          <div class="name">Character ID (${idValue}) Not Found in Database</div>`)
            console.log(err);
        }) // end of get request

    // Clear the input after the search is completed.
    charactersDiv.html('')

  }
  
  document.getElementById('edit-character-form').onsubmit = function(){
            
  }
  
  document.getElementById('new-character-form').onsubmit = function(){
                
  }
})
