$(document).ready(function () {
    $('#fishForm').submit(function (event) {
        event.preventDefault(); // Prevent form submission

        var fishID = $('#fishID').val(); // Get the fish ID from the input field

        // Make the AJAX GET request
        $.ajax({
            url: 'https://acnhapi.com/v1/fish/' + fishID,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Prepare the data for DataTables
                var tableData = [
                    ['Name', data.name['name-USen']],
                    ['Price', data.price],
                    ['Location', data.availability.location],
                    ['Time', data.availability.time],
                    ['Catch-Phrase', data["catch-phrase"]],
                    ['Shadow', data.shadow],
                    ['Months', data.availability['month-array-northern']]
                ];

                // Destroy the existing DataTable (if any)
                if ($.fn.DataTable.isDataTable('#fishTable')) {
                    $('#fishTable').DataTable().destroy();
                }

                // Initialize the DataTable with the new data
                var dataTable = $('#fishTable').DataTable({
                    data: tableData,
                    columns: [
                        { title: 'Attribute' },
                        { title: 'Value' }
                    ],
                    destroy: true, // Ensure previous DataTable instance is destroyed
                    paging: false, // Disable paging
                    searching: true // Enable searching
                });

                // Show the fish information table
                $('#fishInfo').show();

                // Perform search
                dataTable.search('').draw(); // Clear previous search
                $('#fishTable_filter input').val(''); // Clear search input
                $('#fishTable_filter input').attr('placeholder', 'Search...'); // Add placeholder text to search input
            },
            error: function (xhr, status, error) {
                if (xhr.status === 404) {
                    $('#fishInfo').html('<p>Names or ID Not Found</p>');
                } else {
                    console.log('Error:', error);
                    $('#fishInfo').html('<p>Error occurred. Please try again.</p>');
                }
                $('#fishInfo').show();
            }
        });
    });
});
