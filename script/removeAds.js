function removeAds(){
    adsList.forEach(ads => {
        const adsSearch = document.querySelectorAll(ads)
        adsSearch.forEach(value => {
            value.remove();
        });
    })
}