const navigation = document.querySelector(".main-navigation");
const toggleButton = navigation.querySelector(".main-navigation__toggle");

navigation.classList.remove("main-navigation--no-js");

toggleButton.addEventListener("click", function() {
  if (navigation.classList.contains("main-navigation--closed")) {
    navigation.classList.remove("main-navigation--closed");
    navigation.classList.add("main-navigation--opened");
  } else {
    navigation.classList.add("main-navigation--closed");
    navigation.classList.remove("main-navigation--opened");
  }
});
