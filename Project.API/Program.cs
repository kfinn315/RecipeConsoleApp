using Project.API.Endpoints;
using Project.API.Extensions;

string SPA_URL = "http://localhost:5173";
string JSON_DATA_PATH = "./Data";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.RegisterJsonFileRepositories(JSON_DATA_PATH);

builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost",
                builder =>
                {
                    builder.WithOrigins(SPA_URL)
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });

var app = builder.Build();
app.UseCors("AllowLocalhost");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

CategoryEndpoints.Map(app);
RecipeEndpoints.Map(app);

app.Run();
