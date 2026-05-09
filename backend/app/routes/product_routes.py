from flask import Blueprint, request, jsonify
from ..models.product import Product
from ..extensions import db

product_bp = Blueprint("products", __name__)

# GET all products
@product_bp.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify([p.to_dict() for p in products])

# CREATE product
@product_bp.route("/products", methods=["POST"])
def create_product():
    data = request.json

    product = Product(
        name=data["name"],
        quantity=data.get("quantity", 0),
        price=data.get("price", 0.0)
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.to_dict()), 201

# UPDATE product
@product_bp.route("/products/<int:id>", methods=["PUT"])
def update_product(id):

    product = Product.query.get_or_404(id)

    data = request.json

    product.name = data.get("name", product.name)
    product.quantity = data.get("quantity", product.quantity)
    product.price = data.get("price", product.price)

    db.session.commit()

    return jsonify(product.to_dict())

# DELETE product
@product_bp.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product deleted"
    })