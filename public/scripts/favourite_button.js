$(() => {
  $(document).on('click','.fav',function(event) {
    event.preventDefault();
    const id = $(this).data("id");

    const setColor = function(isFav,id) {
      if (isFav) {
        $(`#${id}`).css("color","#c81d25");
      } else {
        $(`#${id}`).css("color","#c81d25");
      }
    }

    console.log('fav button with listingid:',id);
    $.ajax(`/favourites/${id}`, {type: "POST"})
      .then((isFav)=>{
        console.log("isFAV:",isFav,id);
        setColor(isFav,id);
      })
      .catch((err)=>console.log(err));
  });
});