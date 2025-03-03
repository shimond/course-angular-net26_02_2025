namespace MainApp.Model;
public record Product(int Id, string Name, string Description, double Price);


public record UpdatePriceRequest(int Id, double NewPrice);