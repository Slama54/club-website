import mongoose from 'mongoose';

const championSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    ChampionName: {
        type: String,
        required: true,
      },
      ChampionDate: {
        type: Date,
        required: true,
      },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://img.freepik.com/photos-gratuite/main-femme-soulevant-medaille-or-olympique-signe-victoire_123827-29577.jpg?w=900&t=st=1713822417~exp=1713823017~hmac=b2191f9ed5b305992627a1135e6f0b1ca8aa5136318e43fc8b003197f2d45d45',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Champion = mongoose.model('Champion', championSchema);

export default Champion;