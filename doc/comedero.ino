#include <EEPROM.h>
#include <Wire.h>
#include <DS1307RTC.h>        // La libreria que gestiona el DS1307 RTC para Time
#include <NewPing.h>          // La libreria que gestiona el Sensor Ultrasónico
#include "HX711.h"            // La libreria que gestiona la célula de carga
#include <SoftwareSerial.h>

#define PIN_ABRIR    9    // Para el MOTOR
#define PIN_CERRAR   10
#define FC_COMPUERTA 8    // Final de Carrera de la Compuerta
#define FC_POSITIVO  7
#define FC_NEGATIVO  6

#define TRIGGER_PIN  12   // Para el sensor Ultrasónico (Cable Verde)
#define ECHO_PIN     11
#define MAX_DISTANCE 200

#define DOUT         5    // Para la célula de carga
#define CLK          4

#define BRX          2    // Para la comunicación bluetooth
#define BTX          3

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);   // Configuración de pines y máxima distancia.

SoftwareSerial bSerial(BRX, BTX);

HX711 scale(DOUT, CLK);
float calibration_factor = -105500;                   // Para la célula de carga
long factorCero = -137460;


int veces = 0;
int hora[7];
int minuto[7];

int nivel_0 = 45;      // cm
int nivel_100 = 5;     // cm

int nivelMin = 5;      // %
//int nivelMax = 95;   // %

int openTime;
float pesoRacion;

tmElements_t tm;

const long interval = 1000;
unsigned long currentMillis;

char cadena[30];            // Array que almacenará los caracteres que que se reciben por el puerto Uart. Le asignamos  un tope de caracteres, en este caso 30
byte posicion = 0;          // Variable para cambiar la posición de los caracteres del array


void setup() {
  pinMode(A3, OUTPUT);
  digitalWrite(A3, HIGH);   // Alimentación + del reloj
  pinMode(A2, OUTPUT);
  digitalWrite(A2, LOW);    // Alimentación - del reloj

  Serial.begin(9600);
  while (!Serial) {
    ;                       // Esperar a que el puerto serie se conecte
  }

  scale.set_scale(calibration_factor);
  scale.tare();             //Reset the scale to 0

  Serial.println("Iniciando");

  bSerial.begin(9600);

  //long factorCero = scale.read_average();    //Get a baseline reading
  //Serial.print("Zero factor: ");              //This can be used to remove the need to tare the scale. Useful in permanent scale projects.
  //Serial.println(zero_factor);

  leerMemoria();
  pinMode(FC_POSITIVO, OUTPUT);
  pinMode(FC_NEGATIVO, OUTPUT);
  digitalWrite(FC_POSITIVO, HIGH);    // Alimentación + del Final de Carrera
  digitalWrite(FC_NEGATIVO, LOW);     // Alimentación - del Final de Carrera
  pinMode(PIN_ABRIR, OUTPUT);
  pinMode(PIN_CERRAR, OUTPUT);
  pinMode(FC_COMPUERTA, INPUT);
  currentMillis = millis();
}
//void (* reset) (void) = 0;            // Se declara la función reset en la @ direcion 0

void loop() {
  if (millis() >= currentMillis) {
    currentMillis += interval;
    alarma();
  }

  if (Serial.available())                   //Si hay datos dentro del buffer
  {
    memset(cadena, 0, sizeof(cadena));      //Borrar(memset) el contenido del array "cadena" desde la posición 0 hasta el final(sizeof)
    while (Serial.available() > 0)          //Mientras haya datos en el buffer ejecuta la función
    {
      delay(5);                             //Poner un pequeño delay para mejorar la recepción de datos
      cadena[posicion] = Serial.read();     //Lee un carácter del string "cadena" de la "posicion", luego lee el siguiente carácter con "posicion++"
      posicion++;
    }
    procesarCadena();
    posicion = 0; //Ponemos la posicion a 0
  }

  if (bSerial.available())                   //Comunicacion bluetooth
  {
    memset(cadena, 0, sizeof(cadena));
    while (bSerial.available() > 0)
    {
      delay(5);
      cadena[posicion] = bSerial.read();
      posicion++;
    }
    procesarCadena();
    posicion = 0; //Ponemos la posicion a 0
  }
}

void procesarCadena() {
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if (cadena[0] == '>') {
    switch (cadena[1]) {
      case '1':
        readHora();           // del reloj
        break;
      case '2':
        readNivel();          // del sensor ultrasonico
        break;
      case '3':
        readPeso();           // de la célula de carga
        break;
      case '4':
        readPesoRacion();     // de la memoria EEPROM
        break;
      case '5':
        readHora();
        readNivel();
        break;
      case '6':
        readHora();
        readPeso();
        break;
      case '7':
        readPeso();
        readNivel();
        break;
      case '8':
        readHora();
        readNivel();
        readPeso();
        break;
      case '9':
        readHorario();      // de la memoria EEPROM
        break;
      case 'a':
        setHora();          // ajustar el reloj
        break;
      case 'b':
        setNivelCien();     // calibrar el nivel 100% del contenedor
        break;
      case 'c':
        setNivelCero();     // calibrar el nivel 0% del contenedor
        break;
      case 'd':
        setNivelMin();      // calibrar el nivel mínimo
        break;
      case 'e':
        setPesoRacion();    // configurar el peso por ración
        break;
      case 'f':
        setPesoCero();      // calibrar el factor cero de la célula de carga
        break;
      case 'g':
        setHorario();       // programar el horario de raciones
        break;
      case 'h':
        readHoraNivelPeso();    // liberar ración. La cantidad depende del pesoRacion
        break;
      case 'H':
        readAjustes();    // liberar ración. La cantidad depende del pesoRacion
        break;
      case 'I':
        readHorario2();    // liberar ración. La cantidad depende del pesoRacion
        break;
      case 'i':
        abrir();                // Simplemene abre la compuerta
        break;
      case 'j':
        cerrar();               // Cierra la compuerta
        break;
      case 'k':
        setOpenTime();               // Cierra la compuerta
        break;
      case 'x':
        liberarRacion();    // liberar ración. La cantidad depende del pesoRacion
        break;
        //case 'x':
        //confOpenTime();
        //break;
        //default:
        //mostrarAyuda();
        //break;
    }
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}

//============================== FUNCIONES READ ==========================================

void readHora() {
  //if (RTC.read(tm)) {
  Serial.print("1");
  printDigits(tm.Hour);
  Serial.write(':');
  printDigits(tm.Minute);
  Serial.write(':');
  printDigits(tm.Second);
  Serial.println();
  //} else {
  //if (RTC.chipPresent()) {
  //Serial.println("El reloj ha parado. Por favor configura la hora");
  //Serial.println();
  //} else {
  //Serial.println("Error al leer el reloj. Por favor revisa la circuiteria.");
  //Serial.println();
  //}
  //delay(9000);
  //}
}

void readNivel() {
  Serial.print("2");
  Serial.println(getNivel());
}

void readPeso() {
  Serial.print("3");
  Serial.println(scale.get_units(), 2);
}

void readHoraNivelPeso() {
  //if (RTC.read(tm)) {
  bSerial.print(" Hora del Comedero: ");
  printDigits2(tm.Hour);
  bSerial.write(':');
  printDigits2(tm.Minute);
  bSerial.write(':');
  printDigits2(tm.Second);
  bSerial.println(" Hs. \n");
  bSerial.print(" Nivel del Tanque:  ");
  bSerial.print(getNivel());
  bSerial.println(" % \n");
  bSerial.print(" Peso de la Batea:  ");
  bSerial.print(scale.get_units(), 2);
  bSerial.println(" Kg. \n");
  //} else {
  //if (RTC.chipPresent()) {
  //bSerial.println(" El reloj ha parado. Por favor configura la hora");
  //} else {
  //bSerial.println(" Error al leer el reloj. Por favor revisa la circuiteria.");
  //}
  //delay(9000);
  //}
}

void readPesoRacion() {
  Serial.print("4");
  Serial.println(pesoRacion);
}

void readHorario() {
  Serial.print("9");
  Serial.print(veces);
  for (int i = 0; i < veces; i++) {
    printDigits(hora[i]);
    printDigits(minuto[i]);
  }
  Serial.println();
}

void readHorario2() {
  for (int i = 0; i < veces; i++) {
    bSerial.println();
    printDigits2(hora[i]);
    bSerial.write(':');
    printDigits2(minuto[i]);
    bSerial.println(" hs");
  }
}

void readAjustes() {
  bSerial.print("Nivel Mínimo: ");
  bSerial.print(nivelMin);
  bSerial.println(" %\n");
  bSerial.print("Peso por Racion: ");
  bSerial.print(pesoRacion);
  bSerial.println(" kg\n");
  bSerial.print("Nivel 100%: -");
  bSerial.print(nivel_100);
  bSerial.println(" cm\n");
  bSerial.print("Nivel 0%: -");
  bSerial.print(nivel_0);
  bSerial.println(" cm\n");
  bSerial.print("Tiempo de apertura: ");
  bSerial.print(openTime);
  bSerial.println(" seg");
}

//============================== FUENCIONES SET ==========================================

void setHora() {
  bool parse = false;
  bool config = false;

  if (getTime()) {            // Obtener la hora
    parse = true;
    if (RTC.write(tm)) {      // Configurar el reloj
      config = true;
    }
  }

  if (parse && config) {
    Serial.println("Hora configurada correctamente");
    bSerial.println("Hora configurada correctamente");
  } else if (parse) {
    Serial.println("Error al comunicar con el reloj :-(");
    Serial.println("Por favor, revisa la circuiteria");
    bSerial.println("Error al comunicar con el reloj :-(");
  } else {
    Serial.println("Hora no valida");
  }
}

void setPesoRacion() {
  pesoRacion = cadena[2];
  EEPROM.write(201, pesoRacion);
  pesoRacion = pesoRacion / 10.00;
  Serial.print("Peso = ");
  Serial.print(pesoRacion);
  Serial.println(" Kg");
  bSerial.print("Peso = ");
  bSerial.print(pesoRacion);
  bSerial.println(" Kg");
}

void setOpenTime() {
  Serial.print("Tiempo de apertura (Seg): ");
  while (!Serial.available());
  openTime = Serial.parseInt();
  Serial.println(openTime);
  EEPROM.write(200, openTime);
}

void setNivelCero() {
  nivel_0 = sonar.ping_cm();
  delay(20);
  Serial.print("Distancia: ");
  Serial.print(nivel_0);
  Serial.println(" cm");
  bSerial.print("Distancia: ");
  bSerial.print(nivel_0);
  bSerial.println(" cm");
  EEPROM.write(202, nivel_0);
}

void setNivelCien() {
  nivel_100 = sonar.ping_cm();
  delay(20);
  Serial.print("Distancia: ");
  Serial.print(nivel_100);
  Serial.println(" cm");
  bSerial.print("Distancia: ");
  bSerial.print(nivel_100);
  bSerial.println(" cm");
  EEPROM.write(203, nivel_100);
}

void setNivelMin() {
  nivelMin = cadena[2];
  Serial.print("Nivel Minimo: ");
  Serial.print(nivelMin);
  Serial.println("%");
  bSerial.print("Nivel Minimo: ");
  bSerial.print(nivelMin);
  bSerial.println("%");
  EEPROM.write(204, nivelMin);
}

void setPesoCero() {
  factorCero = scale.read_average();
  EEPROM.write(205, factorCero);
}

void setHorario() {
  veces = cadena[2];
  EEPROM.write(0, veces);
  int addr = 1;
  for (int i = 0; i < veces; i++) {
    hora[i] = cadena[addr + 2];
    EEPROM.write(addr, hora[i]);
    addr += 1;
    minuto[i] = cadena[addr + 2];
    EEPROM.write(addr, minuto[i]);
    addr += 1;
  }
}

//============================== OTRAS FUNCIONES ==========================================

void leerMemoria() {
  veces = EEPROM.read(0);
  if (veces < 8) {
    int addr = 1;
    for (int i = 0; i < veces; i++) {
      hora[i] = EEPROM.read(addr);
      addr = addr + 1;
      minuto[i] = EEPROM.read(addr);
      addr = addr + 1;
    }
    openTime = EEPROM.read(200);
    pesoRacion = EEPROM.read(201) / 10.00;
    nivel_0 = EEPROM.read(202);
    nivel_100 = EEPROM.read(203);
    nivelMin = EEPROM.read(204);
    //readHorario();
  } else {                // Si hay un error en la carga de datos
    veces = 1;            // Se insertan valores por defecto
    hora[0] = 8;
    minuto[0] = 0;
    pesoRacion = 5;
    nivel_0 = 47;
    nivel_100 = 4;
    openTime = 3;
  }
}

void printDigits(int number) {
  if (number < 10) {
    Serial.write('0');
  }
  Serial.print(number);
}

void printDigits2(int number) {
  if (number < 10) {
    bSerial.write('0');
  }
  bSerial.print(number);
}

//============================== GETs ==========================================

bool getTime() {
  int Hour = cadena[2];
  int Min = cadena[3];
  int Sec = cadena[4];

  if (Hour > 23) return false;
  if (Min > 59) return false;
  if (Sec > 59) return false;

  tm.Hour = Hour;
  tm.Minute = Min;
  tm.Second = Sec;
  return true;
}

float getPeso() {
  return scale.get_units();
}

int getNivel() {
  int Dist = sonar.ping_cm();
  delay(29);
  int Nivel = (100 * (Dist - nivel_0)) / (nivel_100 - nivel_0);
  return Nivel;
}

void getPesoCero() {
  factorCero = EEPROM.read(205);
}

//============================== CONTROL ==========================================

void liberarRacion() {
  int Nivel = getNivel();;
  float pesoActual = getPeso();
  if (pesoActual < pesoRacion) {
    if (Nivel > nivelMin) {

      Serial.println("Liberando comida..");
      digitalWrite(PIN_ABRIR, HIGH);   // Abriendo
      Serial.println("Abriendo..");
      delay(1400);
      digitalWrite(PIN_ABRIR, LOW);    // parar
      Serial.println("Abierto");

      //currentMillis += openTime * 1000;
      //while (millis() < currentMillis) {
      while (pesoActual < pesoRacion) {
        pesoActual = getPeso();
        Nivel =  getNivel();
        //Serial.print("2");
        //Serial.println(Nivel);
        delay(1);
        //Serial.print("3");
        //Serial.println(pesoActual);
        delay(1);
        if (Nivel <= nivelMin) {
          Serial.println("Se alcanzo el nivel minimo");
          break;
        }
      }
      cerrar();

    } else Serial.println("Se alcanzo al nivel minimo");
  } else Serial.println("La batea esta llena");
}

void abrir() {
  if (digitalRead(FC_COMPUERTA) == LOW) {
    digitalWrite(PIN_ABRIR, HIGH);   // Abriendo
    Serial.println("Abriendo..");
    delay(1400);
    digitalWrite(PIN_ABRIR, LOW);    // parar
    Serial.println("Abierto");
  }
}

void cerrar() {
  if (digitalRead(FC_COMPUERTA) == HIGH) {
    informe();
    digitalWrite(PIN_CERRAR, HIGH);  // Cerrando
    Serial.println("Cerrando..");
    while (digitalRead(FC_COMPUERTA) == HIGH) {
      ; // esperar hasta que la compuerta se cierre completamente
    }
    digitalWrite(PIN_CERRAR, LOW);   // Parar
    Serial.println("Cerrado");
  }
}

void alarma() {
  if (RTC.read(tm)) {
    for (int i = 0; i < veces; i++) {
      if (tm.Hour == hora[i])
        if (tm.Minute == minuto[i])
          if (tm.Second == 0) {
            liberarRacion();
            Serial.end();
            Serial.begin(9600);
            while (!Serial) {
              ; 
            }
            bSerial.end();
            bSerial.begin(9600);
            //leerMemoria();
          }
    }
  } else {
    if (RTC.chipPresent()) {
      Serial.println("El reloj ha parado. Por favor configura la hora");
      Serial.println();
    } else {
      Serial.println("Error al leer el reloj. Por favor revisa la circuiteria.");
      Serial.println();
    }
    delay(9000);
  }
}
void informe(){
  Serial.print('x');
  printDigits(tm.Hour);
  Serial.write(':');
  printDigits(tm.Minute);
  Serial.write(':');
  printDigits(tm.Second);
  Serial.write(';');
  Serial.println(scale.get_units(), 2);   
}

