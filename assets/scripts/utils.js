$(document).ready(function() {
    $(".chevron-scroll").click(function(e) {
        var destination = $(this).attr('href');
        e.preventDefault();
        $('html,body').animate({scrollTop: $(destination).offset().top},'slow');
    })
})