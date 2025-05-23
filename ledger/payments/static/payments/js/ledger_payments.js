var ledger_payments = {

        var: {
                'current_invoice_group_id': '',
                'current_invoice_no': '',
                'current_booking_reference': '',
                'csrf_token': '',
                'payment_info_url': '/ledger/payments/api/ledger/payments-info',
                'failed_transaction_url': '/ledger/payments/api/ledger/failed-transactions',
                'payment_total_url': '/ledger/payments/api/ledger/payment-totals',
                'payment_info': [],
                'pagestart': 0,
                'pageend': 10,
                'formoptions': { 'frstatus': '', 'frsystem': '', 'frkeyword': '', 'ptsystem': '', 'ptkeyword': '', 'ptsettlement_date': '' },
                'selected_id': null,
                'system_interface_permssions': {},
                'ptdatepickerOptions': {
                        format: 'dd/mm/yyyy',
                        showClear: true,
                        useCurrent: false,
                        autoclose: true
                },

        },
        load_payment_info: function () {
                data = {}
                $('#LoadingPopup').modal('show');
                $.ajax({
                        url: ledger_payments.var.payment_info_url + "?invoice_group_id=" + ledger_payments.var.current_invoice_group_id + "&invoice_no=" + ledger_payments.var.current_invoice_no + "&booking_reference=" + ledger_payments.var.current_booking_reference + "&receipt_no=" + ledger_payments.var.receipt_no + "&txn_number=" + ledger_payments.var.txn_number,
                        method: "GET",
                        headers: { 'X-CSRFToken': ledger_payments.var.csrf_token },
                        //data: JSON.stringify({'payload': data,}),
                        contentType: "application/json",
                        success: function (data) {
                                var orderdata = "";
                                var bpointdata = "";
                                var cashdata = "";
                                var linked_invoices = "";
                                if (data.status == 200) {
                                        if (data.data.order.length > 0) {
                                                for (let i = 0; i < data.data.order.length; i++) {
                                                        var line_price_incl_tax_color = '#bb2d3b';
                                                        if (data.data.order[i].line_price_incl_tax > 0) {
                                                                line_price_incl_tax_color = '#157347';
                                                        }

                                                        orderdata += "<tr><td>" + data.data.order[i].order_number + "</td><td>" + data.data.order[i].title + "</td><td>" + data.data.order[i].oracle_code + "</td><td style='background-color: " + line_price_incl_tax_color + "; color: #FFFFFF;'>$" + data.data.order[i].tax_amount + "</td><td style='background-color: " + line_price_incl_tax_color + "; color: #FFFFFF;'>$" + data.data.order[i].line_price_incl_tax + "</td><td>$" + data.data.order[i].rolling_total + "</td><td>" + data.data.order[i].order_date + "</td></tr>";
                                                        // console.log(data.data.order[i]); 
                                                }

                                                for (let i = 0; i < data.data.bpoint.length; i++) {

                                                        bpointdata += "<tr><td>" + data.data.bpoint[i].txnnumber + "</td><td><A href='/ledger/payments/invoice-pdf/" + data.data.bpoint[i].crn1 + "' target='_pdf_invoice_" + data.data.bpoint[i].crn1 + "'>" + data.data.bpoint[i].crn1 + "</a></td><td>" + data.data.bpoint[i].action + "</td><td>$" + data.data.bpoint[i].amount + "</td><td>" + data.data.bpoint[i].processed + "</td><td>" + data.data.bpoint[i].settlement_date + "</td><td>" + data.data.bpoint[i].last_digits + "</td></tr>";
                                                        // console.log(data.data.bpoint[i]);
                                                }

                                                for (let i = 0; i < data.data.cash.length; i++) {
                                                        cashdata += "<tr><td>" + data.data.cash[i].id + "</td><td>" + data.data.cash[i].invoice_reference + "</td><td>" + data.data.cash[i].action + "</td><td>$" + data.data.cash[i].amount + "</td><td>" + data.data.cash[i].created + "</td></tr>";
                                                }
                                        }
                                        if (data.data.linked_payments.length > 0) {
                                                for (let i = 0; i < data.data.linked_payments.length; i++) {
                                                        linked_invoices += "<tr><td><A href='/ledger/payments/invoice-pdf/" + data.data.linked_payments[i].invoice_reference + "' target='_pdf_invoice_" + data.data.linked_payments[i].invoice_reference + "'>" + data.data.linked_payments[i].invoice_reference + "</a> - " + data.data.linked_payments[i].oracle_invoice_number + "</td><td>" + data.data.linked_payments[i].booking_reference + "</td><td>" + data.data.linked_payments[i].booking_reference_linked + "</td><td>" + data.data.linked_payments[i].settlement_date + "</td></tr>";

                                                }

                                        }

                                        $('#order_list').html(orderdata);
                                        $('#bpoint_tbody').html(bpointdata);
                                        $('#cash_tbody').html(cashdata);
                                        $('#linked_invoices').html(linked_invoices);
                                        $('#total_payment_gateway').html('$&nbsp;' + data.data.total_gateway_amount);
                                        $('#total_cash_payment').html('$&nbsp;' + data.data.total_cash_amount);
                                        $('#total_unallocated').html('$&nbsp;' + data.data.total_unallocated);
                                        $('#total_oracle').html('$&nbsp;' + data.data.total_oracle_amount);

                                        $('#fix-linked-invoice-grouping-link').attr("href", "/ledger/payments/oracle/payments/linked-invoice-issues/" + data.data.invoice_group_id + "/");
                                        $('#fix-linked-payment-issues').attr("href", "/ledger/payments/oracle/payments/linked-payment-issues/" + data.data.invoice_group_id + "/");

                                        refund_booking.var.bpoint_trans_totals = data.data.bpoint;
                                        refund_booking.var.cash_trans_totals = data.data.cash;
                                        refund_booking.var.cash_on_invoices = data.data.cash_on_invoices;
                                        refund_booking.var.invoices_data = data.data.invoices_data;
                                        refund_booking.var.unique_oracle_code_on_booking = data.data.oracle_code_totals;
                                        refund_booking.var.booking_reference = data.data.booking_reference;
                                        refund_booking.var.booking_reference_linked = data.data.booking_reference_linked;
                                        refund_booking.var.invoice_group_id = data.data.invoice_group_id;                                        
                                        refund_booking.var.oracle_code_tax_status = data.data.oracle_code_tax_status;
                                        refund_booking.re_init();

                                        if (data.data.invoice_group_checks_total > 1) {
                                                $('#oracle-payments-data-error-message').html("<B>Error</B> Linked invoice grouping issues.  Please fix before making any monetary changes or payment refunds.");
                                                $('#oracle-payments-data-error').show();
                                        }
                                        var bpoint_cash_total = data.data.total_gateway_amount + data.data.total_cash_amount;
                                        if (parseFloat(data.data.total_oracle_amount) != parseFloat(bpoint_cash_total)) {
                                                $('#oracle-payments-data-error-message').html("<B>Error</B> You have a oracle discrepency agasin't your bpoint and cash payments.  Please investigate before performing any monetary changes.");
                                                $('#oracle-payments-data-error').show();
                                        }

                                }

                                setTimeout("$('#LoadingPopup').modal('hide');", 500);

                                if (data.status == 404) {
                                        $('#oracle-payments-data-error-message').html(data.message);
                                        $('#oracle-payments-data').hide();
                                        $('#oracle-payments-data-error').show();
                                }

                                // refund_booking.init();
                                // console.log(data);
                        },
                        error: function (errMsg) {

                                setTimeout("$('#LoadingPopup').modal('hide');", 500);
                                $('#oracle-payments-data-error-message').html("An error has occured");
                                $('#oracle-payments-data').hide();
                                $('#oracle-payments-data-error').show();

                        }
                });
        },
        update_page_failed_transactions: function (pagestart, pageend) {
                ledger_payments.var.pagestart = pagestart;
                ledger_payments.var.pageend = pageend;
                ledger_payments.load_failed_transactions();
        },
        update_page_payment_totals: function (pagestart, pageend) {
                ledger_payments.var.pagestart = pagestart;
                ledger_payments.var.pageend = pageend;
                ledger_payments.load_payment_totals();
        },
        update_failed_transaction_status: function (selected_id) {
                ledger_payments.var.selected_id = selected_id;
                $('#ConfirmAction').modal('show');
        },
        update_failed_transaction_status_confirmed: function () {
                ledger_payments.save_failed_transaction(ledger_payments.var.selected_id);
        },
        init_failed_transactions: function () {

                $("#fr-status").change(function () {
                        ledger_payments.var.formoptions.frstatus = this.value;
                        console.log(ledger_payments.var.formoptions.frstatus);
                });

                ledger_payments.var.formoptions.frstatus = $("#fr-status").val();

                $("#fr-system").change(function () {
                        ledger_payments.var.formoptions.frsystem = this.value;
                        console.log(ledger_payments.var.formoptions.frsystem);
                });

                ledger_payments.var.formoptions.frsystem = $("#fr-system").val();

                $("#settlement_report").change(function () {
                        alert(this.value);
                        ledger_payments.var.formoptions.ptsettlement_date = this.value;
                });

                ledger_payments.var.formoptions.frkeyword = $("#fr-keyword").val();

                $("#fr-filter").click(function () {
                        ledger_payments.load_failed_transactions();
                });

                $("#confirm_status_change_btn").click(function () {
                        ledger_payments.update_failed_transaction_status_confirmed();
                });
                var system_interface_permssions = $('#system_interface_permssions').val();
                system_interface_permssions_obj = JSON.parse(system_interface_permssions);

                ledger_payments.system_interface_permssions = system_interface_permssions_obj
                // system_interface_permssions
                ledger_payments.load_failed_transactions();
        },
        init_payment_totals: function () {

                $('#settlementDatePicker').datepicker(ledger_payments.var.ptdatepickerOptions);
                $("#pt-status").change(function () {
                        ledger_payments.var.formoptions.frstatus = this.value;
                        console.log(ledger_payments.var.formoptions.frstatus);
                });

                // ledger_payments.var.formoptions.frstatus = $("#pt-status").val();

                $("#pt-system").change(function () {
                        ledger_payments.var.formoptions.frsystem = this.value;
                        console.log(ledger_payments.var.formoptions.frsystem);
                });

                ledger_payments.var.formoptions.frsystem = $("#pt-system").val();

                $("#pt-keyword").change(function () {
                        ledger_payments.var.formoptions.ptkeyword = this.value;
                        console.log(ledger_payments.var.formoptions.ptkeyword);
                });

                ledger_payments.var.formoptions.frkeyword = $("#pt-keyword").val();

                $("#pt-filter").click(function () {
                        ledger_payments.load_payment_totals();
                });

                var system_interface_permssions = $('#system_interface_permssions').val();
                system_interface_permssions_obj = JSON.parse(system_interface_permssions);

                ledger_payments.system_interface_permssions = system_interface_permssions_obj
                // system_interface_permssions
                ledger_payments.load_payment_totals();
        },
        load_payment_totals: function () {
                var settlement_report = $("#settlement_report").val();
                data = {}
                $.ajax({
                        url: ledger_payments.var.payment_total_url + "?pagestart=" + ledger_payments.var.pagestart + "&pageend=" + ledger_payments.var.pageend + "&system=" + ledger_payments.var.formoptions.frsystem + "&settlement_date=" + settlement_report,
                        method: "GET",
                        //headers: {'X-CSRFToken' : ledger_payments.var.csrf_token},
                        //data: JSON.stringify({'payload': data,}),
                        contentType: "application/json",
                        success: function (data) {
                                var html = "";
                                if (data.data.rows.length > 0) {
                                        for (let i = 0; i < data.data.rows.length; i++) {
                                                html += "<tr>";
                                                html += "<td>" + data.data.rows[i]['oracle_system_id_code'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['settlement_date'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['bpoint_gateway_total'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['ledger_bpoint_total'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['oracle_parser_total'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['oracle_receipt_total'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['cash_total'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['bpay_total'] + "</td>";
                                                html += "<td align='center'>";
                                                if (data.data.rows[i]['discrepancy'] == false) {
                                                        html += '<i class="bi bi-check-circle-fill" style="color:#00d900;"></i>';
                                                } else {
                                                        html += '<i class="bi bi-x-circle-fill" style="color:#d90000"></i>';
                                                }
                                                "</td>";
                                                html += "<td>" + data.data.rows[i]['updated'] + "</td>";
                                                html += "</tr>";
                                        }
                                }

                                $('#payment-totals-table tbody').html(html);

                                var pageiterate = data.data.totalrows / 10;
                                var totalpages = parseInt(pageiterate);

                                if (pageiterate > parseInt(pageiterate)) {
                                        totalpages = parseInt(pageiterate) + 1;
                                }

                                var pages = "";
                                pages += '<ul class="pagination  justify-content-center">';
                                pages += '<li class="page-item disabled">';
                                // pages+='<a class="page-link" href="#" tabindex="-1">Previous</a>';
                                pages += '</li>';
                                var pagelimit = 10;
                                var pstart = 0;
                                var pend = 0 + pagelimit;

                                for (let i = 1; i <= totalpages; i++) {
                                        if (i < 32) {
                                                pages += '<li class="page-item ';
                                                if (ledger_payments.var.pagestart == pstart && ledger_payments.var.pageend == pend) {
                                                        pages += ' active';
                                                }
                                                pages += '"><a class="page-link" href="javascript:void(0);" onclick="ledger_payments.update_page_payment_totals(' + pstart + ',' + pend + ');">' + i + '</a></li>';
                                                pstart = pstart + pagelimit;
                                                pend = pend + pagelimit;
                                        }
                                }

                                //    pages+='<li class="page-item active">';
                                //    pages+='<a class="page-link" href="#">2</a>';
                                //    pages+='</li>';
                                //pages+='<li class="page-item"><a class="page-link" href="#">3</a></li>';
                                pages += '<li class="page-item">';
                                // pages+='<a class="page-link" href="#">Next</a>';
                                pages += '</li>';
                                pages += '</ul>';

                                $('#pages').html(pages);
                        },
                        error: function (errMsg) {
                                $('#LoadingPopup').modal('hide');
                        }
                });
        },


        save_failed_transaction: function (rfid) {
                $("#LoadingPopup").modal('show');
                $('#ConfirmAction').modal('hide');
                $.ajax({
                        url: "/ledger/payments/api/ledger/failed-transaction-complete/" + rfid + "/",
                        method: "GET",
                        contentType: "application/json",
                        success: function (data) {
                                ledger_payments.load_failed_transactions();
                                setTimeout(function () { $('#LoadingPopup').modal('hide') }, 500);
                        },
                        error: function (errMsg) {
                                $('#LoadingPopup').modal('hide');
                        }
                });
        },
        load_failed_transactions: function () {

                data = {}
                $.ajax({
                        url: ledger_payments.var.failed_transaction_url + "?pagestart=" + ledger_payments.var.pagestart + "&pageend=" + ledger_payments.var.pageend + "&status=" + ledger_payments.var.formoptions.frstatus + "&system=" + ledger_payments.var.formoptions.frsystem + "&keyword=" + ledger_payments.var.formoptions.frkeyword,
                        method: "GET",
                        //headers: {'X-CSRFToken' : ledger_payments.var.csrf_token},
                        //data: JSON.stringify({'payload': data,}),
                        contentType: "application/json",
                        success: function (data) {
                                var html = "";
                                if (data.data.rows.length > 0) {
                                        for (let i = 0; i < data.data.rows.length; i++) {
                                                html += "<tr>";
                                                html += "<td>" + data.data.rows[i]['invoice_group_id'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['booking_reference'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['invoice_reference'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['refund_amount'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['status_name'] + "</td>";
                                                html += "<td>" + data.data.rows[i]['system_identifier'] + "</td>";
                                                html += "<td>";
                                                var link = '"/ledger/payments/oracle/payments?invoice_group_id=' + data.data.rows[i]['invoice_group_id'] + '"';
                                                var link_completed = 'ledger_payments.update_failed_transaction_status("' + data.data.rows[i]['id'] + '");'
                                                html += "<button type='button' class='btn btn-primary btn-sm' onclick='window.location=" + link + "'>Oracle Refund</button>&nbsp;";
                                                if (data.data.rows[i]['status'] == 0) {
                                                        if (ledger_payments.system_interface_permssions.all_access == true || ledger_payments.system_interface_permssions.manage_ledger_tool == true) {
                                                                html += "<button type='button' class='btn btn-primary btn-sm' onclick='" + link_completed + "'>Mark Completed</button>";
                                                        }
                                                }
                                                html += "</td>";
                                                html += "</tr>";
                                        }
                                }

                                $('#failed-refunds-table tbody').html(html);

                                var pageiterate = data.data.totalrows / 10;
                                var totalpages = parseInt(pageiterate);

                                if (pageiterate > parseInt(pageiterate)) {
                                        totalpages = parseInt(pageiterate) + 1;
                                }

                                var pages = "";
                                pages += '<ul class="pagination  justify-content-center">';
                                pages += '<li class="page-item disabled">';
                                // pages+='<a class="page-link" href="#" tabindex="-1">Previous</a>';
                                pages += '</li>';
                                var pagelimit = 10;
                                var pstart = 0;
                                var pend = 0 + pagelimit;
                                for (let i = 1; i <= totalpages; i++) {
                                        pages += '<li class="page-item ';
                                        if (ledger_payments.var.pagestart == pstart && ledger_payments.var.pageend == pend) {
                                                pages += ' active';
                                        }
                                        pages += '"><a class="page-link" href="javascript:void(0);" onclick="ledger_payments.update_page_failed_transactions(' + pstart + ',' + pend + ');">' + i + '</a></li>';
                                        pstart = pstart + pagelimit;
                                        pend = pend + pagelimit;
                                }
                                //    pages+='<li class="page-item active">';
                                //    pages+='<a class="page-link" href="#">2</a>';
                                //    pages+='</li>';
                                //pages+='<li class="page-item"><a class="page-link" href="#">3</a></li>';
                                pages += '<li class="page-item">';
                                // pages+='<a class="page-link" href="#">Next</a>';
                                pages += '</li>';
                                pages += '</ul>';

                                $('#pages').html(pages);
                        },
                        error: function (errMsg) {
                                $('#LoadingPopup').modal('hide');
                        }
                });
        },
        init: function () {
                
                setTimeout("ledger_payments.load_payment_info();", 400);

        }
}

