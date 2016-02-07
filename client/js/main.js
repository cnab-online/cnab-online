/* ==========================================================================
   ADVANCED FILE VIEW
   ========================================================================== */

$('body').delegate('.file-field, .file-field-label', 'mouseenter click', function() {
  var result = /file-field(-label)?\-([0-9]+)/.exec($(this).attr('class'));
  $('.file-field, .file-field-label').removeClass('label-info');
  if(result) {
    var pos = result[2];
    var lineContainer = $(this).parents('.file-row');
    lineContainer.find('.file-field-'+pos+', .file-field-label-'+pos).addClass('label-info');
  }
});