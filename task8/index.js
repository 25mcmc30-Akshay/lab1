$(document).ready(function () {

    let booksJSON = [];

    // Load XML file
    $.ajax({
        type: "GET",
        url: "books.xml",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publication_date: $(this).find("publication_date").text()
                };

                booksJSON.push(book);
            });

            populateFilters(booksJSON);
            displayBooks(booksJSON);
        },
        error: function () {
            alert("Error loading XML file!");
        }
    });

    // Function to display books in table
    function displayBooks(data) {

        let tbody = $("#bookTable tbody");
        tbody.empty();

        $.each(data, function (index, book) {
            let row = `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publication_date}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    // Populate dropdown filters
    function populateFilters(data) {

        let genres = [...new Set(data.map(book => book.genre))];
        let authors = [...new Set(data.map(book => book.author))];

        $.each(genres, function (i, genre) {
            $("#genreFilter").append(`<option value="${genre}">${genre}</option>`);
        });

        $.each(authors, function (i, author) {
            $("#authorFilter").append(`<option value="${author}">${author}</option>`);
        });
    }

    // Filter button click
    $("#filterBtn").click(function () {

        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = parseFloat($("#minPrice").val()) || 0;
        let maxPrice = parseFloat($("#maxPrice").val()) || Infinity;

        let filtered = booksJSON.filter(function (book) {

            return (selectedGenre === "" || book.genre === selectedGenre) &&
                   (selectedAuthor === "" || book.author === selectedAuthor) &&
                   (book.price >= minPrice && book.price <= maxPrice);
        });

        displayBooks(filtered);
    });

});