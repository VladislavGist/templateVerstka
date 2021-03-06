"use strict";

var anchor = function anchor() {
    $(".anchorBtnBottom").click(function (event) {
        event.preventDefault();
        var el = $(this).attr("href");
        $("body, html").animate({
            scrollTop: $(el).offset().top - 20
        }, 800);
        return false;
    });
};

var accordion = function accordion() {
    //accordion
    $(".link a").click(function () {

        $(".panel").each(function (idx, elem) {
            //у всех блоков в заг. убираем класс
            $(elem).find(".panel-heading").removeClass("active");
            //переворачиваем все иконки вниз
            $(elem).find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        });

        //у блока с названием переключаем класс
        $(undefined).parent().parent().parent().parent().toggleClass("active");

        //если у содержимого есть класс in
        if ($(undefined).parent().parent().parent().parent().next().hasClass("in")) {

            //у блока с названием удаляем класс active
            $(undefined).parent().parent().parent().parent().removeClass("active");
            //текущую иконку переворачием
            $(undefined).parent().next().removeClass("fa-angle-up");
            $(undefined).parent().next().addClass("fa-angle-down");
        } else {
            //если у содержимого класса in нету
            //то иконка покажет на верх
            $(undefined).parent().next().removeClass("fa-angle-down");
            $(undefined).parent().next().addClass("fa-angle-up");
        }
    });
};

//slick
var carousels = function carousels() {
    $(".carousel01").slick({
        dots: true,
        centerMode: false,
        adaptiveHeight: true,
        infinite: false
    });
};

var masks = function masks() {
    $("input[name='phone_code']");
    $("input[name='phone']").mask("9999999");
};

//код города
var intlTel = function intlTel() {
    $(".demo-form.pre").intlTelInput({
        initialCountry: "ru"
    });

    $(".demo-form.pre").val("+7");
};

var formCheckbx = function formCheckbx() {
    $(".form-agreement label").click(function (e) {
        e.getPreventDefault;
        if ($(e.target).hasClass("changed")) {
            $(e.target).removeClass("changed");
            $(e.target).find("input").removeAttr("checked");
        } else {
            $(e.target).addClass("changed");
            $(e.target).find("input").attr("checked", "checked");
        }
    });

    //если у инпута вн есть chacked то opacity1
    $(".form-agreement label").each(function (idx, elem) {
        if ($(elem).find("input").prop("checked")) {
            $(elem).addClass("changed");
        } else {
            $(elem).remove("changed");
        }
    });

    //если у .form-subscribe нет класса changed
    //тогда у .form-subscribe-detail label убираем класс changed
    $(".form-subscribe").click(function () {
        if ($(this).hasClass("changed") == false) {
            $(".form-subscribe-detail label").each(function (idx, elem) {
                $(elem).removeClass("changed");
            });
        } else {
            $(".form-subscribe-detail label").each(function (idx, elem) {
                $(elem).addClass("changed");
            });
        }
    });

    //если у .form-subscribe-detail label хотябы одного нет класса changed
    //тогда у .form-subscribe убираем класс changed
    $(".form-subscribe-detail label").click(function () {
        if ($(this).hasClass("changed") == false) {
            $(".form-subscribe").removeClass("changed");
        }

        //если у .form-subscribe-detail label у какого то нету
        //то .form-subscribe добавляем класс changed
        var mass = [];
        $(".form-subscribe-detail label").each(function (idx, elem) {
            //по каждому клику будет создаваться массив
            if ($(elem).hasClass("changed")) {
                mass.push(true);
            } else {
                mass.push(false);
            }

            //если в массиве все значения true == длинне массива, то ставим класс
            var massLength = mass.length;
            var trueCount = 0;
            $(mass).each(function (idx, elem) {
                if (elem == true) {
                    trueCount++;
                }
            });
            if (massLength == trueCount) {
                $(".form-subscribe").addClass("changed");
            } else {
                $(".form-subscribe").removeClass("changed");
            }
        });
        mass = [];
    });
};

//чтобы корректно работали состояния формы и select выбора кода страны
function hiddenOfForm() {
    $(".regLink").click(function () {
        $(".form-params").css({ overflow: "visible" });
    });

    if ($(".regLink").length === 0) {
        $(".form-params").css({ overflow: "visible" });
    }
}

var changedStyle = function changedStyle() {
    $("label.changed").prepend(function () {
        return "<i class='fa fa-check' aria-hidden='true'></i>";
    });
};

//у таймера переименовывает лейблы на русский
var renameSubtitlesTimer = function renameSubtitlesTimer() {
    $("figcaption").each(function (idx, elem) {
        if ($(elem).text() === "hours") {
            $(elem).text("часов");
        } else if ($(elem).text() === "minutes") {
            $(elem).text("минут");
        } else if ($(elem).text() === "seconds") {
            $(elem).text("секунд");
        } else if ($(elem).text() === "days") {
            $(elem).text("дней");
        }
    });
};

var timerFunc = function timerFunc() {

    $('#countdown').timeTo({
        timeTo: new Date('August 3 2017 00:00:00'),
        displayCaptions: true,
        fontSize: 26,
        captionSize: 12,
        fontFamily: "bebas_neue_regularregular"
    });
};

// let masks = () => {
//     $("input[name='phone_code']").mask("999");
//     $("input[name='phone']").mask("9999999");
// };

// let validate = () => {
//     $("#request_form").validate({
//         rules: {
//             name: {
//                 required: true
//             },
//             email: {
//                 required: true
//             },
//             lastname: {
//                 required: true
//             },
//             tel: {
//                 required: true
//             }
//         },
//         messages: {
//             name: {
//                 required: "Обязательное поле"
//             },
//             email: {
//                 required: "Обязательное поле"
//             },
//             lastname: {
//                 required: "Обязательное поле"
//             },
//             tel: {
//                 required: "Обязательное поле"
//             }
//         }
//     })
// }

$(document).ready(function () {
    formCheckbx();
    accordion();
    carousels();
    intlTel();
    hiddenOfForm();
    anchor();
    changedStyle();
    timerFunc();
    renameSubtitlesTimer();
});