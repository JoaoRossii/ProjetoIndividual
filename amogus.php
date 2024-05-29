<?php
session_start();
ini_set("display_errors", "1");
ini_set("display_startup_errors", "1");
error_reporting(E_ALL);

$servername = "localhost";
$username = "bestdeal_teste";
$password = "joao2005$";
$dbname = "bestdeal_getninjas";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

$id = $_SESSION['id'];
$nome = $_SESSION['nome'];
$email = $_SESSION['email'];
$cpf = $_SESSION['cpf'];
$rua = $_SESSION['rua'];
$bairro = $_SESSION['bairro'];
$estado = $_SESSION['estado'];

$ide = isset($_POST['identificador']) ? $_POST['identificador'] : null;
if ($ide === null) {
    die("Erro: ID do carro não fornecido.");
}

$SQL = "SELECT * FROM cadastrousuario WHERE email='" . $email . "'";
$resultado = mysqli_query($conn, $SQL);

if (!$resultado) {
    die("Erro na consulta SQL: " . mysqli_error($conn));
}

$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

if (isset($_POST['titulo'])) {
    // Recupera os dados do formulário
    $titulo = $_POST['titulo'];
    $txt = $_POST['textoAnuncio'];

    // Diretório para salvar as imagens
    if (isset($_FILES['imagens1'])) {
        // Obter nome do arquivo
        
        $gravar = "UPDATE anuncios SET tituloAnuncio=?, descricaoAnuncio=? WHERE idAnuncio=?";
        $stmt = $conn->prepare($gravar);
        $stmt->bind_param("ssi", $titulo, $txt, $ide);
        $resultado = $stmt->execute();

        if ($resultado === false) {
            echo "<script> window.alert('Problemas ao Alterar.'); window.location.href='prosp-tela.php'; </script>";
        } else {
            echo "<script> window.alert('Alterado com sucesso.'); window.location.href='prosp-tela.php'; </script>";
        }
    }
}
    $stmt->close();
$conn->close();
?>

