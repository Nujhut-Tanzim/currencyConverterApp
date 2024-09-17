<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Currency Converter</title>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
    crossorigin="anonymous" />

  <style>
    body {
      padding: 0;
      margin: 0;
      background-color: whitesmoke;
      color: aliceblue;
    }



    .container {
      margin-top: 49px;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    .card {
      width: 40px;
      border-radius: 6%;
      background-color: rgba(0, 0, 0, 0.7);
      color: aliceblue;
    }

    h2 {
      text-align: center;
    }

    #icon {
      margin-left: 10px;
      height: 30px;
      width: 39px;
    }

    img {
      width: 50px;
      margin-left: 0;
    }

    .d-open {
      display: block;
    }

    #convertBtn {
      width: 190px;
    }
  </style>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img id="icon" src="download.jfif" alt="" /></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="{{ route('index') }}"><b>Home</b></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="{{ route('showForm') }}"><b>Transaction</b></a>
          </li>
          <li class="nav-item">
            <!-- Button trigger modal -->
            <b type="button" class="mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Contact us
            </b>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style="color:black">Send Message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="save-form1">
                      <div class="form-group">
                        <label for="name" style="color:black">Name</label>
                        <input type="text" class="form-control" id="name" name="name">
                      </div>
                      <div class="form-group">
                        <label for="email" style="color:black">Email</label>
                        <input type="email" class="form-control" id="email" name="email">
                      </div>
                      <div class="form-group">
                        <label for="message" style="color:black">Message</label>
                        <input type="text" class="form-control" id="message" name="message"></input>
                      </div><br>
                      <div class="alert alert-secondary d-none" role="alert" id="result" style="color:black"></div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="Send()">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <div class="card" style="width: 27rem;">
      <div class="card-body">
        <h2 class="card-title mb-2">Currency Converter</h2>
        <hr>
        <div class="card-text mt-3">
          <div class="row ">
            <div class="col-6">
              <label for="amount">Amount: </label>
              <input type="number" class="form-control mt-2" id="amount" placeholder="Amount" />
            </div>
            <div class="col-6">
              <label for="app">App:</label>
              <select class="form-select mt-2" type="text" id="app">
                <option>Select an API</option>
                <option value="wise">Wise Api</option>
                <option value="exchangeRate">Currency Layer Api</option>
              </select>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-4 mt-2">
              <label for="fromCurrency">From Currency: </label>
              <select class="form-select mt-1" type="text" id="fromCurrency" onchange=flagImage1()>

              </select>
            </div>
            <div class="col-2 mt-1">
              <div id="flags-container1" class="flags-container1 mt-4">
                <img src="download.png" alt="">
              </div>
            </div>
            <div class="col-4 mt-2">
              <label for="toCurrency">To Currency:</label>
              <select class="form-select mt-1" type="text" id="toCurrency" onchange=flagImage2()>

              </select>
            </div>
            <div class="col-2 mt-1">
              <div id="flags-container2" class="flags-container2 mt-4 mb-1">
                <img src="download.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row mt-2">
          <div class="col-12">
            <div class="alert alert-secondary d-none text-center" role="alert" id="result1"></div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12 text-center">
            <button type="button" onclick="convert()" id="convertBtn" class="btn btn-warning mt-2"><b>Convert</b></button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="script.js"></script>

</body>

</html>