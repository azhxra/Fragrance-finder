from fastapi import FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Simple Fragrance API",
    description="A beginner-friendly REST API containing information about perfumes.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# FRAGRANCE DATA
perfumes = [

    {
        "id": 1,
        "brand": "Prada",
        "name": "Paradoxe Intense",
        "year": 2023,
        "scent_family": "Floral Amber",
        "top_notes": "Neroli, Amber, White Musk",
        "description": "A warm, magnetic floral amber built around a bold, addictive musk."
    },

    {
        "id": 2,
        "brand": "Victoria's Secret",
        "name": "Vanilla Lace",
        "year": 2021,
        "scent_family": "Warm Vanilla Floral",
        "top_notes": "Vanilla, Jasmine, Musk",
        "description": "A soft, sweet vanilla scent layered with delicate florals for an everyday signature."
    },

    {
        "id": 3,
        "brand": "Carolina Herrera",
        "name": "Good Girl Blush",
        "year": 2021,
        "scent_family": "Floral Fruity",
        "top_notes": "Pear, Jasmine, Tonka Bean",
        "description": "A playful, feminine take on Good Girl with juicy fruit and creamy tonka warmth."
    },

    {
        "id": 4,
        "brand": "Yves Saint Laurent",
        "name": "Black Opium",
        "year": 2014,
        "scent_family": "Oriental Vanilla",
        "top_notes": "Black Coffee, White Flowers, Vanilla",
        "description": "A bold, addictive gourmand built around espresso and sweet vanilla."
    },

    {
        "id": 5,
        "brand": "Chanel",
        "name": "Coco Mademoiselle",
        "year": 2001,
        "scent_family": "Oriental Chypre",
        "top_notes": "Orange, Jasmine, Patchouli",
        "description": "A modern, sophisticated classic balancing citrus freshness with warm sensuality."
    }

]

# HOME
@app.get("/")
def home():

    return {
        "message": "Welcome to the Simple Fragrance API!",
        "endpoints": [
            "/perfumes",
            "/perfumes/{id}",
            "/perfumes/search"
        ]
    }


# GET ALL PERFUMES
@app.get("/perfumes")
def get_perfumes():

    return {
        "count": len(perfumes),
        "perfumes": perfumes
    }


# GET ONE PERFUME
@app.get("/perfumes/{perfume_id}")
def get_perfume(perfume_id: int):

    for perfume in perfumes:

        if perfume["id"] == perfume_id:
            return perfume

    raise HTTPException(
        status_code=404,
        detail="Perfume not found."
    )

# SEARCH PERFUMES
@app.get("/perfumes/search")
def search_perfumes(q: str = Query(..., min_length=1)):
    q = q.lower()
    results = []
    for perfume in perfumes:
        searchable_text = (
            f"{perfume['brand']} "
            f"{perfume['name']} "
            f"{perfume['scent_family']} "
            f"{perfume['top_notes']}"
        ).lower()

        if q in searchable_text:
            results.append(perfume)

    return {
        "query": q,
        "count": len(results),
        "results": results
    }
