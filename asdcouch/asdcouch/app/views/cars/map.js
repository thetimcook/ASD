function (doc) {
	if (doc._id.substr(0, 3) === "car"){
		emit(doc.make, {
			"rev": doc._rev,
			"make": doc.make,
			"model": doc.model,
			"year": doc.year,
			"color": doc.color,
			"display": doc.display,
			"condition": doc.condition,
			"describe": doc.describe
		});
	}
};