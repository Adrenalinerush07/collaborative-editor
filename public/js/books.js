function validateForm() {
    var x = document.forms["contactform"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }