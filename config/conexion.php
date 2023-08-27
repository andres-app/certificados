<?php
    /*TODO: Inicializando la sesion del usuario */
    session_start();

    /*TODO: Iniciamos Clase Conectar */
    class Conectar{
        protected $dbh;

        /*TODO: Funcion Protegida de la cadena de Conexion */
        protected function Conexion(){
            try {
                /*TODO: Cadena de Conexion Desarrollo*/
				$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=certificados","root","");

                /*TODO: Cadena de Conexion Produccion*/
				//$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=u274409976_certificados","u274409976_certificados","Redes72607251$$$");
				return $conectar;
			} catch (Exception $e) {
                /*TODO: En Caso hubiera un error en la cadena de conexion */
				print "¡Error BD!: " . $e->getMessage() . "<br/>";
				die();
			}
        }

        /*TODO: Para impedir que tengamos problemas con las ñ o tildes */
        public function set_names(){
            return $this->dbh->query("SET NAMES 'utf8'");
        }

        /*TODO: Ruta principal del proyecto */
        public static function ruta(){
            //Desarrollo
            return "http://localhost/certificados/";
            
            //Produccion
            //return "https://peruaprende.com/certificados/";
        }

    }
?>