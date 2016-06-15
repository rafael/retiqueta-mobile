export default function(ngComponent) {

  ngComponent.factory('Faqs', Faqs)

  function Faqs () {
    const Model = [
      {
        name: '¿Quiénes somos?',
        items: ['Retiqueta es una comunidad donde puedes comprar y vender ropa a través de tu celular. En Retiqueta vendes tu estilo y consigues piezas con historia. Somos un lugar donde los buenos modales son algo cool . Buscamos personas que quieran formar parte de algo más que una aplicación para el celular, buscamos amigos que compartan gustos por: rayas, colores, vestidos, converses o tacones y escriban notas con un “gracias” cuando envíen la venta a su comprador.']
      },
      {
        name: 'Métodos de pago en Retiqueta',
        items: ['En Retiqueta te ofrecemos un pago seguro a través de tu tarjeta de crédito. Si quieres saber como es nuestro programa para proteger a los compradores y vendedores te invitamos a leer nuestros Términos y Condiciones.']
      },
      {
        name: 'Política de comisión de Retiqueta',
        items: ['¡Quisiéramos no cobrar comisión pero nuestro equipo trabaja duro!.... Recuerda que tu colocas el precio de la pieza. Ganas un 75% ​del precio de la pieza. Nosotros cobramos un 25% ​de ese precio por cada pieza que vendas.']
      },
      {
        name: '¿Cuál es el método de envío/recibo?',
        items: ['Al terminar el proceso de pago del producto, el comprador podrá comunicarse con el vendedor por medio de un chat dentro de la aplicación para ponerse de acuerdo en el método de envío. Si deciden hacer la entrega del paquete en persona, recomendamos ir a sitios públicos y que una persona de confianza conozca del encuentro. Toma las medidas de seguridad pertinentes. Si lo haces en persona no olvides llevar un recibo de entrega para que sean firmado por las partes. El costo del envío es por mutuo acuerdo. Aconsejamos a los vendedores incluir en su precio este costo y detallarlo en la descripción del producto.']
      },
      {
        name: 'Paquetes de envío',
        items: ['Embala con cariño la pieza que vendiste, recuerda que a parte de hablar buen de ti como vendedora, tus seguidores lo tomará en cuenta para futuras compras. Sería encantador recibir un paquete envuelto con amor. ¡Escríbele una nota de agradecimiento y será tu compradora por siempre!']
      },
      {
        name: '¿Qué es “Mi Balance” ?',
        items: ['Mi balance es el dinero que tienes de crédito por tus piezas vendidas. El dinero será transferido a final de mes en la cuenta bancaria de tu preferencia. Lo hacemos a final de mes si tienes muchas más de una venta.']
      },
      {
        name: '¿Cómo cobras tus ventas?',
        items: ['El dinero será transferido cada mes en la cuenta bancaria de tu preferencia. Lo hacemos a final de mes si tienes muchas más de una venta.']
      },
      {
        name: '¿Cómo puedes vender más piezas?',
        items: ['Recuerda que Retiqueta es una comunidad. ¡​Debes hacerte notar! Trata de tomar buenas fotos​   con una luz apropiada. Debes hacer una descripción adecuada, no importa que la pieza tenga  un detalle con tal que le tomes fotos y seas sincera. No olvides que puedes ser la estilista de  tus propias piezas, a las personas le encantará saber como pudieran combinar esa pieza que  quieres vender. Utiliza las otras redes sociales para invitar a tus amigos a tu closet en  Retiqueta.']
      },
      {
        name: '¿Qué sucede si no recibes tu pedido?',
        items: ['Los vendedores tienen 5 días hábiles para comunicarte que enviaron tu pedido a través del  chat, de lo contrario al 6to día se cancelará la compra y se cerrará la comunicación. Retiqueta  devolverá el dinero a la compradora.']
      },
      {
        name: '¿Por qué eliminamos tu comentario?',
        items: ['Los comentarios son para realizar preguntas sobre las piezas. No puedes compartir ningun tipo  de información personal: número de télefono, celular, link, encontrar, teléfono, email...entre  otras. Nosotros hacemos esta plataforma para brindarte la mayor seguridad y hacer una  comunidad de gente honesta que valora el trabajo de los demás. Tratar de esquivar la comisión  de Retiqueta no solo le haces daño a la plataforma si no al grupo de emprendedores que  trabajamos mucho para brindarte una comunidad segura.']
      },
      {
        name: 'Te llegó una pieza distinta a lo descrito​:',
        items: ['Las piezas de segunda mano por general no tiene devolución. Solamente aceptamos la  devolución cuando la prenda que recibiste no es exactamente como la descripción, podrás  solicitar la devolución dentro de las 48 horas posteriores a que la recibiste. La compradora  debe enviar la pieza devuelta al domicilio de Retiqueta. Para todos los detalles debes  comunicarte con inforetiqueta@gmail.com​ ​. Te aconsejamos leer este sobre este punto en  nuestros Términos y Condiciones.']
      },
      {
        name: '¡Contacta a Retiqueta!',
        items: ['Queremos estar muy cerca de ti. Nos puedes escribir a nuestro email ​inforetiqueta@gmail.com  y no dudes en darnos feedback o comunicarnos cualquier inquietud que tengas. Nos encanta  que nos escribas por mensajes directo o privados a través de nuestras redes sociales.']
      }
    ]

    return Model
  }
}
