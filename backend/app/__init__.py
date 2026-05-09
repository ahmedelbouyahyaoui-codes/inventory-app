from flask import Flask
from .config import Config
from .extensions import db, migrate
from .routes.product_routes import product_bp
from flask_cors import CORS
app = Flask(__name__)
def create_app():
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    @app.route("/")
    def home():
        return {"message": "Inventory API with DB ready"}

    return app

app.register_blueprint(product_bp)