const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`
        https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    // 1 create a parent diva caching hear

    const phoneContainer = document.getElementById('phone-container')
    // clear a phon container cards before adding new cards 
    phoneContainer.textContent = "";



    // display show all button if more then 12 phone
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    console.log('is show all', isShowAll)

    // slice setting display only first 12 phones if not show all 
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }



    phones.forEach(phone => {
        // console.log(phone)
        // 2 create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-blue-100 p-4  shadow-xl`;
        
        // 1 set a innerHtml 
        phoneCard.innerHTML = `
        

        <figure><img src=" ${phone.image}" alt="Shoes" /></figure>
            
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name
                }</h2>
                <p>Your Choice is our choice so , so you must find you products with us , if you don't find out your products then please let us know</p>
                <div class="card-actions justify-end">
                    <button onclick = "handleShowDetail('${
                        phone.slug}')" class="btn btn-ghost font-semibold hover:bg-green-50">SHOW DETAILS</button>
                </div>
            </div>

        `


        // 4 append child
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);

}



// handle show detail button set
const handleShowDetail= async(id)=> {
    // console.log('click show details',id)
  // load evry single phone data

    const res = await fetch(`
        https://openapi.programming-hero.com/api/phone/${id}
    `);
    const data = await res.json();
    // console.log(data)
    const phone = data.data;
    
    
    
    showPhoneDetails(phone)
   

}



const showPhoneDetails = (phone)=>{
    console.log(phone)

    const phoneName = document.getElementById('showDetail-phone-name')
    phoneName.innerText = phone.name;



    const showDetailContainer = document.getElementById     ('show-detail-container')



    showDetailContainer.innerHTML = `
    
        <img class="pl-[30%] py-4" src="${phone.image}" alt="" />
        
        <p>
            <span class="text-[18px] font-bold">storage : </span>${phone?.mainFeatures?.storage}
        </p>
    
        <p>
            <span class="text-[18px] font-bold">chipSet : </span>${phone?.mainFeatures?.chipSet}
        </p>
   
        <p>
            <span class="text-[18px] font-bold">displaySize : </span>${phone?.mainFeatures?.displaySize}
        </p>
      
        <p>
            <span class="text-[18px] font-bold">mainFeature by : </span>${phone?.mainFeatures?.memory}
        </p>

        <p>
            <span class="text-[18px] font-bold "> slug : </span>${phone?.slug}
        </p>

        <p>
            <span class="text-[18px] font-bold "> releaseDate : </span>${phone?.releaseDate}
        </p>

        <p>
            <span>brand : </span>${phone?.brand}
        </p>
    
        <p>
            <span class="text-[18px] font-bold">Sensors : </span>${phone?.mainFeatures?.sensors}
        </p>


        <p>
            <span class="text-[18px] font-bold">GPS : </span>${phone?.others?.GPS || 'no GPS available'}
        </p>



    `




    //display the modal
    show_detail_modals.showModal()


}




// handle search button 
const handlesSearch = (isShowAll)=>{
    // console.log('search')
    toggleLoadingSpinner(true)
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    // console.log(searchText)
    
    loadPhone(searchText, isShowAll);

}







const toggleLoadingSpinner = (idLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(idLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}


// handle show all
const handleShowAll = ()=> {
    handlesSearch(true)

} 



loadPhone()