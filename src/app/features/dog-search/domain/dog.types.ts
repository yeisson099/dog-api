export type DogBreed = {
  name: string;
  subBreeds: string[];
};

export type DogImage = {
  message: string;
  status: string;
};

export type DogBreedsResponse = {
  message: Record<string, string[]>;
  status: string;
};

export type DogSearchResult = {
  breed: string;
  subBreed?: string;
  imageUrl: string;
}; 