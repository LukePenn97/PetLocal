$(() => {
  $(document).on('click','.mark_as_sold',function(event) {
    event.preventDefault();
    const id = $(this).data("id");

    const setDisplay = function(isSold,id) {
      if (isSold) {
        $(`#sold-${id}`).css("display","flex");
      } else {
        $(`#sold-${id}`).css("display","none");
      }
    }

    console.log('mark as sold listingid:',id);
    $.ajax(`/listings/${id}/mark_as_sold`, {type: "POST"})
      .then((isSold)=>{
        console.log("isSold:",isSold,id);
        if (isSold) {
          setDisplay(isSold, id);
        }
      })
      .catch((err)=>console.log(err));
  });
});