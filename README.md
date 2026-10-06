## Ariel Eduardo Borbon Izaguirre 252116

## Preguntas

¿Por qué esta tabla se puede llamar «genérica»?
Se llama generica porque como tal esta no sabe nada de donde se esta usando, como se itera con las columnas para los encabezados (y leer la clave para el valor de cada objeto en el arreglo de filas). Osea basicamente el que tiene toda la responsabilidad de decir como se mostrara la tabla es el main.ts, no el codigo de tabla-generica.ts


¿Qué tendría que cambiar para mostrar alumnos en lugar de productos?
En tabla-generica.ts nada, pero en main.ts si tendria que cambiarse el contrato, algo como: tabla.columnas = [{ clave: 'id', titulo: 'Matrícula' }, { clave: 'nombre', titulo: 'Estudiante' }];



describan el contrato de su componente en tres partes: qué recibe, qué avisa y qué guarda adentro

Recibe: Recibe un HTML llamado tipo ( "exito" , "aviso" , "Error" ) que basicamente son los que definen el estilo de la alerta y recibe el texto con la etiqueta slot, que es el hueco donde se coloca el mensaje de la alerta

Avisa: Como salida dispara un customEvent llamado cerrar (es el que sucede cuando el usuario presiona la X en la alerta) dejandole esta responsabilidad al main.ts

Que guarda: Guarda referencias a los elementos del shadow DOM (el div contenedor y el botonCerrar) para poder modificar sus clases cuando se llame al metodo de pintar(), no se guarda un estado logico 